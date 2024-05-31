<template>
  <div class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    <div class="flex items-center">
      <h1 class="text-lg font-semibold md:text-2xl">Dashboard</h1>
    </div>
    <div
      class="h-full rounded-lg border border-dashed shadow-sm p-4 grid grid-cols-2 gap-4"
    >
      <div class="col-span-1">
        <Card class="flex flex-col items-center relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1/3 bg-accent"></div>
          <!-- Top background bar -->
          <CardHeader class="flex items-center gap-y-4 z-10">
            <Avatar class="size-20">
              <AvatarImage
                :src="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`"
              />
              <AvatarFallback>
                <Server class="size-8" />
              </AvatarFallback>
            </Avatar>
            <CardTitle>{{ guild.name }}</CardTitle>
          </CardHeader>
          <CardContent class="flex flex-col items-center">
            <span class="font-bold">{{ guild.memberCount | 0 }}</span>
            <span>Members</span>
          </CardContent>
        </Card>
      </div>
      <div class="col-span-1">
        <!-- <Card></Card> -->
        <pre>{{ guild }}</pre>
      </div>
      <div class="col-span-2">
        <!-- <Card></Card> -->
        {{ commands }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Server } from "lucide-vue-next";

definePageMeta({
  name: `Dashboard`,
});

const route = useRoute();

const { data: guild } = await useFetch(`/api/guilds/${route.params.id}`, {
  credentials: "include",
});

const { data: commands } = await useFetch(
  `/api/guilds/${route.params.id}/commands`,
  {
    credentials: "include",
  }
);
</script>
