<template>
  <div class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    <div class="flex items-center">
      <h1 class="text-lg font-semibold md:text-2xl">Dashboard</h1>
    </div>
    <div class="h-full rounded-lg border border-dashed shadow-sm p-4">
      <div class="flex flex-col gap-4">
        <div>
          <p v-for="i in 100" :key="i">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe
            doloribus odio atque. Ullam dolores a, veritatis laboriosam in
            nihil! Unde suscipit fugiat iure accusamus doloremque aspernatur
            quia dolores voluptatum nobis? Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Saepe quam quaerat dignissimos dicta
            et numquam aliquam iure ex, consectetur quisquam necessitatibus
            dolorum exercitationem incidunt vel delectus. Dicta explicabo quis
            fugit!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
