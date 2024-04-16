<template>
  <div class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    <div class="flex items-center">
      <h1 class="text-lg font-semibold md:text-2xl">Dashboard</h1>
    </div>
    <div class="h-full rounded-lg border border-dashed shadow-sm p-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        <Card
          v-for="guild in guilds"
          :key="guild.id"
          class="flex flex-col justify-between gap-2"
        >
          <CardHeader class="pt-0 p-4 items-center">
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
          <CardContent class="p-4 pt-0">
            <NuxtLink
              v-if="guild.botInGuild"
              :to="`/guilds/${guild.id}`"
              class="block text-primary-500 font-semibold"
              @click="selectedGuild = guild.id"
            >
              <Button size="sm" class="w-full font-semibold">
                Go to server
              </Button>
            </NuxtLink>
            <a
              v-else
              href="/api/add-bot"
              class="block text-primary-500 font-semibold"
            >
              <Button variant="outline" size="sm" class="w-full font-semibold">
                Invite bot to server
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Server } from "lucide-vue-next";

definePageMeta({
  name: "Index",
});

const { guilds, selectedGuild } = storeToRefs(useGuilds());
</script>
