<template>
  <div class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    <div class="flex items-center">
      <h1 class="text-lg font-semibold md:text-2xl">
        {{ guild.name }} - Dashboard
      </h1>
    </div>
    <div class="h-full rounded-lg border border-dashed shadow-sm p-4">
      <div class="flex flex-col gap-4">
        <pre>{{ guild }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: `Guild Dashboard`,
});

const route = useRoute();
const { getGuildById } = useGuilds();
const guild = await getGuildById(route.params.id as string);
</script>
