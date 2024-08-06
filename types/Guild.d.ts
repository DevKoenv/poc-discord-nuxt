interface Guild {
  id: string;
  name: string;
  icon: string | null;
  prefix: string;
  language: string;

  createdAt: Date | string;
  updatedAt: Date | string;

  commands: Command[];
}

type Guilds = Guild[];
