<template>
  <div class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    <div class="flex items-center">
      <h1 class="text-lg font-semibold md:text-2xl">Dashboard</h1>
    </div>
    <div
      v-if="guild"
      class="flex flex-col gap-4 rounded-lg border border-dashed p-4 shadow-sm md:grid-cols-2 lg:grid"
    >
      <div class="col-span-1">
        <Card
          class="relative flex h-full flex-col items-center overflow-hidden"
        >
          <div class="absolute left-0 top-0 h-1/3 w-full bg-accent"></div>
          <!-- Top background bar -->
          <CardHeader class="z-10 flex items-center gap-y-4">
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
        <Card class="h-full overflow-hidden">
          <CardHeader class="flex items-center gap-y-4">
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="p-4">
              <Label for="prefix"> Prefix </Label>
              <Input
                type="text"
                name="prefix"
                id="prefix"
                placeholder="Enter prefix"
              />
            </div>
            <!-- Add more settings here -->
          </CardContent>
        </Card>
      </div>
      <div class="col-span-2">
        <Card class="overflow-hidden">
          <Table class="">
            <TableHeader>
              <TableRow>
                <TableHead class="w-[150px]"> Command </TableHead>
                <TableHead class="hidden md:table-cell"> Response </TableHead>
                <TableHead class="text-right">
                  <NuxtLink :to="`/guilds/${route.params.guildId}/commands`">
                    <Button size="sm"> New </Button>
                  </NuxtLink>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-if="commands && commands.length > 0"
                v-for="command in commands"
                :key="command.id"
              >
                <TableCell>
                  {{ command.trigger }}
                </TableCell>
                <TableCell class="hidden md:table-cell">
                  {{ command.response.content }}
                </TableCell>
                <TableCell class="text-right">
                  <Button variant="outline" size="sm" disabled> Edit </Button>
                </TableCell>
              </TableRow>
              <TableRow v-else>
                <TableCell
                  colspan="3"
                  class="text-center text-muted-foreground"
                >
                  No commands yet... Try making some!
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
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

const { data: guild } = useFetch(`/api/guilds/${route.params.guildId}`, {
  credentials: "include",
});

const { data: commands } = useFetch<Command[]>(
  `/api/guilds/${route.params.guildId}/commands`,
  {
    credentials: "include",
  }
);
</script>
