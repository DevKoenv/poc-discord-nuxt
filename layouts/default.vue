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
            <form>
              <div class="relative">
                <Search
                  class="absolute left-2.5 top-2.5 size-4 text-muted-foreground"
                />
                <Input
                  id="searchInput"
                  type="search"
                  placeholder="Search guilds..."
                  class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="ghost" size="icon">
                <Moon
                  class="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                />
                <Sun
                  class="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                />
                <span class="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem @click="colorMode.preference = 'light'">
                Light
              </DropdownMenuItem>
              <DropdownMenuItem @click="colorMode.preference = 'dark'">
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem @click="colorMode.preference = 'system'">
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="secondary" size="icon" class="rounded-full">
                <CircleUser class="h-5 w-5" />
                <span class="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />

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

              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
      </div>
      <main class="overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  CircleUser,
  Home,
  LineChart,
  Menu,
  Moon,
  Package2,
  Search,
  Sun,
  Zap,
  TriangleAlert,
  Users,
  Shield,
  Cog,
} from "lucide-vue-next";

const colorMode = useColorMode();

const navigationItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/",
  },
  {
    title: "Alerts",
    icon: TriangleAlert,
    href: "#",
    badge: 6,
  },
  {
    title: "Commands",
    icon: Zap,
    href: "#",
  },
  {
    title: "Users",
    icon: Users,
    href: "#",
  },
  {
    title: "Analytics",
    icon: LineChart,
    href: "about:blank",
    external: true,
  },
];

const adminItems = [
  { title: "Dashboard", href: "/admin" },
  { title: "Logs", href: "/admin/logs" },
];
</script>
