interface Command {
  id: number;
  trigger: string;
  response: Response;
  interaction: string;
  guildId: string;

}

interface Response {
  content: string;
  embeds: Embed[];
  components: Component[];
}

interface Embed {
  title: string;
  description: string;
  color: string;
  fields: Field[];
}

interface Field {
  name: string;
  value: string;
}

interface Component {
  type: string;
  style: string;
  label: string;
  url: string;
  emoji: Emoji;
  disabled: boolean;
}

interface Emoji {
  name: string;
  id: string;
}