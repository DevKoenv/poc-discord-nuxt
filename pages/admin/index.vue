<template>
  <div class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    <div class="flex items-center">
      <h1 class="text-lg font-semibold md:text-2xl">Admin Dashboard</h1>
    </div>
    <div class="h-full rounded-lg border border-dashed p-4 shadow-sm">
      <div class="flex flex-col gap-4"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "Admin Dashboard",
  auth: "admin",
});
</script>
