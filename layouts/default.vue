<template>
  <div class="grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    <div class="hidden border-r bg-muted/40 md:block">
      <div
        class="flex h-full w-[220px] lg:w-[280px] flex-col gap-2 sticky top-0 overflow-hidden"
      >
        <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <NuxtLink to="/" class="flex items-center gap-2 font-semibold">
            <Package2 class="h-6 w-6" />
            <span class="">POC Discord</span>
          </NuxtLink>
        </div>
        <div class="flex-1">
          <Navigation :items="navigationItems" />
        </div>
        <div class="mt-auto p-4">
          <AdCard />
        </div>
      </div>
    </div>
    <div class="flex flex-col h-screen overflow-hidden">
      <div class="sticky top-0 bg-background">
        <header
          class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6"
        >
          <Sheet>
            <SheetTrigger as-child>
              <Button variant="outline" size="icon" class="shrink-0 md:hidden">
                <Menu class="h-5 w-5" />
                <span class="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" class="flex flex-col">
              <Navigation :items="navigationItems" />
              <div class="mt-auto">
                <AdCard />
              </div>
            </SheetContent>
          </Sheet>
          <div class="flex-1">
            <div class="w-full md:hidden">
              <GuildSelector />
            </div>

            <Breadcrumb class="hidden md:block">
              <BreadcrumbList>
                <template v-for="(item, index) in breadcrumbs" :key="index">
                  <BreadcrumbItem>
                    <BreadcrumbLink :as="NuxtLink" :href="`${item.path}`">
                      {{ item.name }}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator
                    v-if="index < breadcrumbs.length - 1"
                  />
                </template>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <Button variant="ghost" size="icon" @click="toggleColorMode()">
            <Sun
              class="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            />
            <Moon
              class="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            />
            <span class="sr-only">Toggle theme</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="secondary" size="icon" class="rounded-full">
                <Avatar>
                  <AvatarImage
                    :src="`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`"
                  />
                  <AvatarFallback>
                    <CircleUser class="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <span class="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />

              <div v-if="isAdmin()">
                <!-- Admin start -->
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Admin</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem
                        v-for="(item, index) in adminItems"
                        :key="index"
                      >
                        <NuxtLink :to="item.href" class="size-full">{{
                          item.title
                        }}</NuxtLink>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <!-- Admin end -->
              </div>

              <DropdownMenuItem class="cursor-pointer" @click="logout">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
      </div>
      <main class="overflow-auto flex flex-col flex-1">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";
import {
  CircleUser,
  Home,
  Menu,
  Moon,
  Package2,
  Sun,
  MessageCircleQuestion,
  Server,
} from "lucide-vue-next";

const { user, isAdmin, logout } = useAuthStore();

// if user.value is changed, log it
watch(user, (value) => {
  console.log(value);
});

const colorMode = useColorMode();
const toggleColorMode = () => {
  colorMode.value = colorMode.value === "dark" ? "light" : "dark";
};

const navigationItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/",
  },
  {
    title: "Guilds",
    icon: Server,
    href: "/guilds",
  },
  {
    title: "Support",
    icon: MessageCircleQuestion,
    href: "/support",
  },
];

const adminItems = [
  { title: "Dashboard", href: "/admin" },
  { title: "Logs", href: "/admin/logs" },
];

const router = useRouter();
const route = useRoute();

const breadcrumbs = ref<{ name: string; path: string }[]>([]);

watchEffect(() => {
  let pathSoFar = "";
  const pathParts = route.path.split("/").filter(Boolean);

  breadcrumbs.value = pathParts.map((part) => {
    pathSoFar += `/${part}`;
    const resolvedRoute = router.resolve({ path: pathSoFar });
    return { name: resolvedRoute.name?.toString() || part, path: pathSoFar };
  });

  breadcrumbs.value.unshift({ name: "Home", path: "/" });
});

const guildStore = useGuilds();

guildStore.fetchGuilds();
</script>
