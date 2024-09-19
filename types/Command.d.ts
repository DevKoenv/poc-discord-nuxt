import type { APIEmbed } from "discord-api-types/v10";

interface Command {
  id: number;
  trigger: string;
  response: CommandResponse;
  interaction: string | null;
  createdAt: Date;
  updatedAt: Date;
  guildId: string;
}

interface CommandResponse {
  content: string;
  embeds: Embed[];
  components: never[]; // TODO: Implement components
}

interface Embed extends APIEmbed {
  color: string;
}
