<template>
  <div class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    <div class="flex items-center">
      <h1 class="text-lg font-semibold md:text-2xl">Admin Logs</h1>
    </div>
    <div class="h-full rounded-lg border border-dashed shadow-sm p-4">
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <ToggleGroup
            class="flex gap-2"
            variant="outline"
            v-model="selectedLogTypes"
          >
            <ToggleGroupItem
              v-for="(value, key) in logVariants"
              :value="key"
              class="capitalize"
              type="multiple"
            >
              {{ key }}
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div class="relative">
          <div
            class="bg-secondary w-full h-96 overflow-y-scroll rounded-md p-4"
            ref="logContainer"
          >
            <div
              v-for="log in filteredLogs"
              :key="log.id"
              class="flex gap-1"
              :class="logVariants[log.log_type] || logVariants.default"
            >
              <span class="whitespace-nowrap">[{{ log.log_time }}]</span>
              <span>$</span>
              <span>{{ log.message }}</span>
            </div>
          </div>
          <Skeleton v-if="!connected" class="absolute inset-0" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SocketLog } from "~/types/Socket";

const io = useSocket();
const logVariants = {
  daemon: "text-primary",
  default: "text-white",
  info: "text-blue-500",
  warning: "text-yellow-500",
  error: "text-red-500",
};

const connected = ref(false);
const logs = ref<SocketLog[]>([]);
const selectedLogTypes = ref<string[]>([]);

const filteredLogs = computed(() => {
  if (selectedLogTypes.value.length === 0) {
    return logs.value;
  }
  return logs.value.filter((log) =>
    selectedLogTypes.value.includes(log.log_type)
  );
});

io.on("connect", () => {
  connected.value = true;
  logs.value = [
    ...logs.value,
    {
      id: 0,
      log_time: new Date().toISOString().replace("T", " ").split(".")[0],
      log_type: "daemon",
      message: "Connected to server",
    },
  ];
});

io.on("disconnect", () => {
  connected.value = false;
  logs.value = [
    ...logs.value,
    {
      id: 0,
      log_time: new Date().toISOString().replace("T", " ").split(".")[0],
      log_type: "daemon",
      message: "Disconnected from server",
    },
  ];
});

io.on("log", (log: SocketLog) => {
  if (logs.value.length >= 100) {
    logs.value.shift(); // Remove the oldest log
  }
  logs.value = [...logs.value, log]; // Add the new log
});

const logContainer = ref<HTMLElement | null>(null);
const shouldScroll = ref(true);

onMounted(() => {
  const container = logContainer.value;
  if (container) {
    container.addEventListener("scroll", () => {
      shouldScroll.value =
        container.scrollTop + container.clientHeight === container.scrollHeight;
    });
  }
});

watch(logs, () => {
  const container = logContainer.value;
  if (container && shouldScroll.value) {
    nextTick(() => {
      container.scrollTop = container.scrollHeight;
    });
  }
});
</script>
