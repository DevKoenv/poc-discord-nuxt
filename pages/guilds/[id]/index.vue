<template>
  <div class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    <div class="flex items-center">
      <h1 class="text-lg font-semibold md:text-2xl">
        Dashboard
      </h1>
    </div>
    <div class="h-full rounded-lg border border-dashed shadow-sm p-4">
      <pre>{{ guild }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: `Dashboard`,
});

const route = useRoute();

const { data: guild } = useFetch(`/api/guilds/${route.params.id}`, {
  credentials: "include",
});
</script>
