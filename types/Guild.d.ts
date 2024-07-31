interface Guild {
  id: string;
  name: string;
  icon: string | null;
  prefix: string;
  language: string;

  createdAt: Date;
  updatedAt: Date;

  commands: Command[];
}

type Guilds = Guild[];
