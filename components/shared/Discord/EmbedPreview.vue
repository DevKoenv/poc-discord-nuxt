<template>
  <div class="flex overflow-hidden my-2 font-sans text-xs text-zinc-300">
    <div
      class="flex-shrink-0 w-1 text-xs leading-5 bg-blue-500 rounded-l-sm"
    ></div>
    <div class="grid grid-flow-row gap-y-1 min-h-0 text-xs leading-5 indent-0">
      <div
        class="grid leading-5 border border-solid border-zinc-700 bg-zinc-800 rounded-r-sm max-w-lg"
      >
        <div class="inline-grid pt-2 pr-4 pb-4 pl-3">
          <div
            class="inline-block overflow-hidden items-center mt-2 text-base font-semibold text-white"
          >
            <span>{{ title }}</span>
          </div>
          <div class="mt-2 text-sm font-normal leading-4 whitespace-pre-line">
            {{ description }}
          </div>
          <div class="grid gap-2 mt-2 s">
            <div
              v-for="(item, index) in items"
              :key="index"
              class="text-sm font-normal leading-4"
            >
              <div class="overflow-hidden mb-px font-semibold text-white">
                {{ item.name }}
              </div>
              <div class="text-zinc-300">
                {{ item.value }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  title: String,
  description: String,
  items: Array,
});
</script>
