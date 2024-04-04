<template>
  <div>
    <div class="flex items-center">
      <h1 class="text-lg font-semibold md:text-2xl">
        Dashboard
      </h1>
    </div>
    <div class="h-full rounded-lg border border-dashed shadow-sm p-4">
      <!-- Index page -->
      <span v-for="i in 100" :key="i">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit non
        libero voluptatibus eveniet officia natus, voluptatem quas quae modi
        ratione obcaecati, quam minus iusto magnam, esse distinctio repudiandae
        totam. Iure.
      </span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
