<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="justify-between my-2 w-full"
      >
        {{
          selectedGuild
            ? guilds.find((guild: any) => guild.id === selectedGuild)?.name
            : "Select guild..."
        }}
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[202px] lg:w-[248px] p-0">
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
                      (guild) => guild.name === ev.detail.value
                    )?.id;
                    navigateTo(`/guilds/${selectedGuild}`);
                  }
                  open = false;
                }
              "
            >
              {{ guild.name }}
              <Check
                :class="
                  cn(
                    'ml-auto h-4 w-4',
                    selectedGuild === guild.id ? 'opacity-100' : 'opacity-0'
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

const { guilds, selectedGuild } = storeToRefs(useGuilds());

// if the route is /guilds/:id, set the selectedGuild to the id
// else if route is / unset the selectedGuild
const route = useRoute();
if (route.path.includes("/guilds/")) {
  selectedGuild.value = route.params.id as string;
}
</script>
