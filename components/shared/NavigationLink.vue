<template>
  <NuxtLink
    :key="title"
    :to="href"
    :external="external"
    :target="(external && '_blank') || '_self'"
    :class="[
      'flex max-h-min items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary',
      $route.path === href && 'bg-secondary text-primary',
    ]"
  >
    <component :is="icon" class="size-5" />
    <span>{{ title }}</span>
    <Badge
      v-if="badge"
      class="ml-auto flex size-5 shrink-0 items-center justify-center rounded-full p-0"
    >
      {{ badge }}
    </Badge>
    <ExternalLink v-if="external" class="ml-auto size-5" />
  </NuxtLink>
</template>

<script setup lang="ts">
import { ExternalLink } from "lucide-vue-next";
import type { NavigationItem } from "~/types/Navigation";

defineProps<NavigationItem>();
</script>
