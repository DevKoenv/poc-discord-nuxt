<template>
  <div class="my-2 flex overflow-hidden font-sans text-xs text-zinc-300">
    <div class="w-1 shrink-0 rounded-l-sm bg-blue-500 text-xs leading-5"></div>
    <div class="grid min-h-0 grid-flow-row gap-y-1 indent-0 text-xs leading-5">
      <div
        class="grid max-w-lg rounded-r-sm border border-solid border-zinc-700 bg-zinc-800 leading-5"
      >
        <div class="inline-grid pb-4 pl-3 pr-4 pt-2">
          <div
            class="mt-2 inline-block items-center overflow-hidden text-base font-semibold text-white"
          >
            <span>{{ title }}</span>
          </div>
          <div class="mt-2 whitespace-pre-line text-sm font-normal leading-4">
            {{ description }}
          </div>
          <div class="mt-2 grid gap-2">
            <div
              v-for="(item, index) in items"
              :key="index"
              class="text-sm font-normal leading-4"
            >
              <div class="mb-px overflow-hidden font-semibold text-white">
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
import type { APIEmbedField } from "discord-api-types/v10";

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  items: {
    type: Array as () => APIEmbedField[],
    required: true,
  },
});
</script>
