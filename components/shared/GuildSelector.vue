<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="my-2 w-full justify-between"
      >
        <div class="flex items-center">
          <Avatar v-if="selectedGuild" class="mr-2 size-6">
            <AvatarImage
              :src="`https://cdn.discordapp.com/icons/${selectedGuild}/${guilds.find((guild: any) => guild.id === selectedGuild)?.icon}.webp`"
            />
            <AvatarFallback>
              {{
                guilds
                  .find((guild: any) => guild.id === selectedGuild)
                  ?.name.charAt(0)
                  .toUpperCase()
              }}
            </AvatarFallback>
          </Avatar>
          {{
            selectedGuild
              ? guilds.find((guild: any) => guild.id === selectedGuild)?.name
              : "Select guild..."
          }}
        </div>
        <ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[202px] p-0 lg:w-[248px]">
      <Command>
        <CommandInput class="h-9" placeholder="Search guild..." />
        <CommandEmpty>No guild found.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="guild in guilds"
              :key="guild.id"
              :value="guild.name"
              @select="
                (ev) => {
                  if (typeof ev.detail.value === 'string') {
                    selectedGuild = guilds.find(
                      (guild) => guild.name === ev.detail.value,
                    )?.id;
                    navigateTo(`/guilds/${selectedGuild}`);
                  }
                  open = false;
                }
              "
            >
              <div class="flex items-center">
                <Avatar class="mr-2 size-6">
                  <AvatarImage
                    :src="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`"
                  />
                  <AvatarFallback>
                    {{ guild.name.charAt(0).toUpperCase() }}
                  </AvatarFallback>
                </Avatar>
                {{ guild.name }}
              </div>
              <Check
                :class="
                  cn(
                    'ml-auto h-4 w-4',
                    selectedGuild === guild.id ? 'opacity-100' : 'opacity-0',
                  )
                "
              />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { Check, ChevronsUpDown } from "lucide-vue-next";
import { cn } from "~/lib/utils";

const open = ref(false);
const guildStore = useGuilds();
const { guilds, selectedGuild } = storeToRefs(guildStore);

const route = useRoute();
if (route.path.includes("/guilds/")) {
  selectedGuild.value = route.params.guildId as string;
}
</script>
