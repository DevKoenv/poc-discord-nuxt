import type { APIEmbed } from "discord-api-types/v10";

interface ICommand extends Command {
  id: number;
  guildId: string;
}

interface Command {
  trigger: string;
  response: CommandResponse;
  interaction: string;
}

interface CommandResponse {
  content: string;
  embeds: Embed[];
  components: Component[];
}

interface Embed extends APIEmbed {
  color: string;
}
