<template>
  <div class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    <div class="flex items-center">
      <h1 class="text-lg font-semibold md:text-2xl">Dashboard</h1>
    </div>
    <div class="h-full rounded-lg border border-dashed p-4 shadow-sm">
      <div class="grid grid-cols-1 gap-6 text-center md:grid-cols-4">
        <template v-if="guilds && guilds.length > 0">
          <Card
            v-for="guild in guilds"
            :key="guild.id"
            class="flex min-h-56 flex-col justify-between gap-2 overflow-hidden break-all"
          >
            <CardHeader class="items-center p-4 pt-0">
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
                :to="`/guilds/${guild.id}`"
                class="block font-semibold text-primary"
                @click="selectedGuild = guild.id"
              >
                <Button size="sm" class="w-full font-semibold">
                  Go to server
                </Button>
              </NuxtLink>
            </CardContent>
          </Card>
        </template>

        <Skeleton v-for="i in 3" v-else :key="i" class="min-h-56" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Server } from "lucide-vue-next";

definePageMeta({
  name: "Home",
});

const { guilds, selectedGuild } = storeToRefs(useGuilds());

onMounted(() => {
  selectedGuild.value = "";
});
</script>
