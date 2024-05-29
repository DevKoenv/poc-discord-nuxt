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

    <NavigationLink v-for="item in items" v-bind="item" />
  </nav>
</template>
<script setup lang="ts">
import { Package2 } from "lucide-vue-next";
import type { NavigationProps } from "~/types/Navigation";

defineProps<NavigationProps>();
</script>
