<template>
  <nav
    class="mx-[-0.65rem] grid items-start gap-1 px-2 text-lg font-medium md:mx-0 md:text-sm lg:px-4"
  >
    <a href="#" class="flex items-center gap-2 text-lg font-semibold md:hidden">
      <Package2 class="size-6" />
      <span class="sr-only">POC Discord</span>
    </a>

    <div class="hidden md:block">
      <GuildSelector />
    </div>

    <NavigationLink v-for="(item, index) in items" :key="index" v-bind="item" />
  </nav>
</template>
<script setup lang="ts">
import { Package2 } from "lucide-vue-next";
import type { NavigationProps } from "~/types/Navigation";

defineProps<NavigationProps>();
</script>
