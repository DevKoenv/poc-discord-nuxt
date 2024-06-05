<template>
  <SplitterPanel v-bind="props">
    <slot />
  </SplitterPanel>
</template>

<script lang="ts" setup>
import { SplitterPanel, type SplitterPanelProps } from "radix-vue";

const props = defineProps<SplitterPanelProps>();
</script>
