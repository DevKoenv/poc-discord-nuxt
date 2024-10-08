<template>
  <div class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    <div class="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        @click="navigateTo(`/guilds/${route.params.guildId}`)"
      >
        <ChevronLeft />
      </Button>
      <h1 class="text-lg font-semibold md:text-2xl">New Command</h1>
    </div>
    <div
      class="flex flex-col gap-4 rounded-lg border border-dashed p-4 shadow-sm"
    >
      <div class="grid gap-4 lg:grid-cols-2">
        <Card class="h-full overflow-hidden">
          <CardContent class="flex h-full flex-col gap-2 p-6">
            <div class="flex flex-col gap-1">
              <Label class="block text-lg" for="trigger">
                Command Trigger
              </Label>
              <Input
                id="trigger"
                v-model="command.trigger"
                label="Command Trigger"
                placeholder="example"
              />
            </div>
            <div class="flex flex-col gap-1">
              <Label class="block text-lg" for="response">
                Command Response
              </Label>
              <Textarea
                id="response"
                v-model="command.response.content"
                label="Command Response"
                placeholder="Lorem ipsum dolor sit amet consectetur, adipis..."
              />
            </div>
            <div class="flex flex-col gap-1">
              <h2 class="block text-lg">Embeds</h2>
              <Accordion type="multiple" class="overflow-auto">
                <AccordionItem
                  v-for="(embed, index) in command.response.embeds"
                  :key="index"
                  :value="index.toString()"
                  class="rounded-md border-b border-input"
                >
                  <AccordionTrigger>
                    <div class="flex">
                      <Dot /><span>{{ embed.title || `Embed ${index}` }}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent class="flex flex-col gap-4 p-2">
                    <div class="flex flex-col gap-1">
                      <Label class="block text-lg" for="embed-title">
                        Embed Title
                      </Label>
                      <Input
                        id="embed-title"
                        v-model="embed.title"
                        label="Embed Title"
                        placeholder="Lorem ipsum."
                      />
                    </div>
                    <div class="flex flex-col gap-1">
                      <Label class="block text-lg" for="embed-description">
                        Embed Description
                      </Label>
                      <Textarea
                        id="embed-description"
                        v-model="embed.description"
                        label="Embed Description"
                        placeholder="Lorem ipsum dolor sit amet consectetur, adipis..."
                      />
                    </div>
                    <div class="flex flex-col gap-1">
                      <Label class="block text-lg" for="embed-color">
                        Embed Color
                      </Label>
                      <Input
                        id="embed-color"
                        v-model="embed.color"
                        label="Embed Color"
                        placeholder="#ffffff"
                      />
                    </div>
                    <div class="flex justify-end">
                      <Button variant="destructive" @click="removeEmbed(index)">
                        Remove
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div class="flex justify-between">
              <Button variant="secondary" @click="addEmbed">Add Embed</Button>
              <Button variant="default" @click="createCommand">Save</Button>
            </div>
          </CardContent>
        </Card>
        <Card class="h-full overflow-hidden">
          <DiscordMessages class="h-full">
            <DiscordMessage
              :author="user.globalName"
              :avatar="`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp`"
            >
              {{ guild.prefix }}{{ command.trigger || "example" }}
            </DiscordMessage>
            <DiscordMessage author="POC-Discord" bot>
              <template #interactions>
                <DiscordInteraction
                  :author="user.globalName"
                  :avatar="`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp`"
                >
                  {{ guild.prefix }}{{ command.trigger || "example" }}
                </DiscordInteraction>
              </template>
              <DiscordMarkdown>{{ command.response.content }}</DiscordMarkdown>
              <template #embeds>
                <DiscordEmbed
                  v-for="(embed, index) in command.response.embeds"
                  :key="index"
                  :border-color="embed.color"
                  :timestamp="embed.timestamp"
                  :author-icon="embed.author?.icon_url"
                  :author-name="embed.author?.name"
                  :author-url="embed.author?.url"
                  :embed-title="embed.title"
                  :footer-icon="embed.footer?.icon_url"
                  :image="embed.image"
                  :thumbnail="embed.thumbnail"
                  :url="embed.url"
                >
                  {{ embed.description }}
                  <template #fields>
                    <DiscordEmbedFields v-if="embed.fields">
                      <DiscordEmbedField
                        v-for="field in embed.fields"
                        :key="field.name"
                        :field-title="field.name"
                        :inline="field.inline"
                      >
                        {{ field.value }}
                      </DiscordEmbedField>
                    </DiscordEmbedFields>
                  </template>
                  <template v-if="embed.footer" #footer>
                    {{ embed.footer.text }}
                  </template>
                </DiscordEmbed>
              </template>
            </DiscordMessage>
          </DiscordMessages>
        </Card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "@discord-message-components/vue/dist/style.css";
import {
  DiscordMessages,
  DiscordMessage,
  DiscordInteraction,
  DiscordMarkdown,
  DiscordEmbed,
  DiscordEmbedFields,
  DiscordEmbedField,
} from "@discord-message-components/vue";
import { ChevronLeft, Dot } from "lucide-vue-next";
import type { Command } from "~/types/Command";

definePageMeta({
  name: `New Command`,
});

const route = useRoute();
const { user } = useAuthStore();
const { data: guild } = await useFetch(`/api/guilds/${route.params.guildId}`);

const command = ref<Command>({
  trigger: "",
  response: {
    content: "",
    embeds: [],
    components: [],
  },
  interaction: "",
});

const addEmbed = () => {
  if (command.value.response.embeds.length >= 5) {
    return toast({
      title: "Embed Limit Reached",
      description: "You can only add up to 5 embeds.",
      variant: "destructive",
    });
  }

  command.value.response.embeds.push({
    title: "",
    description: "",
    color: "",
    fields: [],
  });
};

const removeEmbed = (index: number) => {
  command.value.response.embeds.splice(index, 1);

  return toast({
    title: "Embed Removed",
    description: "You removed an embed from the message.",
    variant: "default",
  });
};

const createCommand = async () => {
  if (!command.value.trigger) {
    return toast({
      title: "Command Trigger Required",
      description: "Please provide a command trigger.",
      variant: "destructive",
    });
  }

  if (
    !command.value.response.content &&
    command.value.response.embeds.length === 0
  ) {
    return toast({
      title: "Command Content Required",
      description: "Please provide a command content or at least one embed.",
      variant: "destructive",
    });
  }

  const { error } = await useFetch(
    `/api/guilds/${route.params.guildId}/commands`,
    {
      method: "POST",
      body: JSON.stringify(command.value),
    },
  );

  if (error.value) {
    return toast({
      title: "Command Creation Failed",
      description: error.value?.data.error,
      variant: "destructive",
    });
  }

  toast({
    title: "Command Created",
    description:
      "The command has been created successfully. You can now use it in your server.",
  });
};
</script>
