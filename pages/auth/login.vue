<template>
  <div class="h-screen flex items-center justify-center">
    <Card class="mx-auto max-w-sm w-full grid gap-6 text-center">
      <CardHeader>
        <CardTitle class="text-2xl"> Login </CardTitle>
        <CardDescription>
          Please login to continue to the dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <Button class="w-full" @click="login('discord')">
            Login with Discord
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "Login",
  layout: false,
  // middleware: "guest-only",
  auth: "guest",
});

function login(provider: string) {
  navigateTo(`/api/auth/${provider}`, {
    external: true,
  });
}
</script>
