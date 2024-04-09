import { ref, onBeforeMount, onUnmounted } from "vue";
import { io, Socket } from "socket.io-client";

export const useSocket = () => {
  const socket = ref(io("", { autoConnect: false }));

  if (process.client) {
    socket.value = io({ autoConnect: false });
    
    onBeforeMount(() => {
      socket.value?.connect();
    });

    onUnmounted(() => {
      socket.value?.disconnect();
    });
  }

  return socket.value;
};