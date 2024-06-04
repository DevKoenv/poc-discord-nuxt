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
      <div class="grid lg:grid-cols-2 gap-4">
        <Card class="overflow-hidden h-full">
          <CardContent class="h-full flex flex-col gap-2 p-6">
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
            <div class="flex flex-col gap-4">
              <h2 class="text-lg font-semibold">Embeds</h2>
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(embed, index) in command.response.embeds"
                    :key="index"
                  >
                    <td>{{ embed.title }}</td>
                    <td>
                      <!-- <Button variant="secondary" @click="editEmbed(index)">
                          Edit
                        </Button>
                        <Button @click="deleteEmbed(index)"> Delete </Button> -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="flex justify-between">
              <Button variant="secondary" @click="addEmbed">Add Embed</Button>
              <Button variant="default" @click="createCommand">Save</Button>
            </div>
          </CardContent>
        </Card>

        <Card class="overflow-hidden h-full">
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

              <DiscordMarkdown>
                {{ command.response.content }}
              </DiscordMarkdown>
              <template #embeds>
                <DiscordEmbed
                  v-for="(embed, index) in command.response.embeds"
                  :key="index"
                  :borderColor="embed.color"
                  :timestamp="embed.timestamp"
                  :authorIcon="embed.author?.icon_url"
                  :authorName="embed.author?.name"
                  :authorUrl="embed.author?.url"
                  :embedTitle="embed.title"
                  :footerIcon="embed.footer?.icon_url"
                  :image="embed.image"
                  :thumbnail="embed.thumbnail"
                  :url="embed.url"
                >
                  {{ embed.description }}
                  <template #fields>
                    <DiscordEmbedFields v-if="embed.fields">
                      <DiscordEmbedField
                        v-for="field in embed.fields"
                        :fieldTitle="field.name"
                        :inline="field.inline"
                      >
                        {{ field.value }}
                      </DiscordEmbedField>
                    </DiscordEmbedFields>
                  </template>
                  <template #footer v-if="embed.footer">
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
import { ChevronLeft } from "lucide-vue-next";
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
  command.value.response.embeds.push({
    title: "Embed 1",
    description: "Desc 1",
    color: "#fedde5",
    fields: [],
  });
};

const createCommand = async () => {
  if (!command.value.trigger) {
    return toast({
      title: "Command Trigger Required",
      description: "Please provide a command trigger.",
      variant: "error",
    });
  }

  if (
    !command.value.response.content &&
    command.value.response.embeds.length === 0
  ) {
    return toast({
      title: "Command Content Required",
      description: "Please provide a command content or at least one embed.",
      variant: "error",
    });
  }

  const { data: response, error } = await useFetch(
    `/api/guilds/${route.params.guildId}/commands`,
    {
      method: "POST",
      body: JSON.stringify(command.value),
    }
  );

  if (error.value) {
    return toast({
      title: "Command Creation Failed",
      description: error.value?.data.error,
      variant: "error",
    });
  }

  toast({
    title: "Command Created",
    description:
      "The command has been created successfully. You can now use it in your server.",
    variant: "success",
  });
};
</script>
