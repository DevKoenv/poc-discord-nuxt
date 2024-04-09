export interface SocketLog {
  id: number;
  log_time: string;
  log_type: "daemon" | "default" | "info" | "warning" | "error";
  message: string;
}
