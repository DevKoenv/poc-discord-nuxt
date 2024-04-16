<template>
  <nav
    class="grid items-start gap-1 px-2 text-lg md:text-sm font-medium lg:px-4 mx-[-0.65rem] md:mx-0"
  >
    <a href="#" class="md:hidden flex items-center gap-2 text-lg font-semibold">
      <Package2 class="h-6 w-6" />
      <span class="sr-only">POC Discord</span>
    </a>

    <div class="hidden md:block">
      <GuildSelector />
    </div>

    <NuxtLink
      v-for="item in props.items"
      :key="item.title"
      :to="
        item.href.includes(':guildId')
          ? selectedGuild
            ? item.href.replace(':guildId', selectedGuild)
            : ''
          : item.href
      "
      :external="item.external"
      :target="(item.external && '_blank') || '_self'"
      :class="[
        'max-h-min flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted',
        $route.path === item.href && 'bg-secondary text-primary',
        item.href.includes(':guildId') &&
          !selectedGuild &&
          'cursor-not-allowed',
      ]"
    >
      <component :is="item.icon" class="size-5" />
      <span>{{ item.title }}</span>
      <Badge
        v-if="item.badge"
        class="ml-auto flex size-5 p-0 shrink-0 items-center justify-center rounded-full"
      >
        {{ item.badge }}
      </Badge>
      <ExternalLink v-if="item.external" class="ml-auto size-5" />
    </NuxtLink>
  </nav>
</template>
<script setup lang="ts">
import { Package2, ExternalLink } from "lucide-vue-next";
import type { NavigationProps } from "~/types/Navigation";

const props = defineProps<NavigationProps>();

const { selectedGuild } = storeToRefs(useGuilds());
</script>
