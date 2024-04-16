export const useGuilds = defineStore("guilds", {
  state: () => ({
    selectedGuild: '',
    guilds: [] as any[],
  }),
  actions: {
    async fetchGuilds() {
      if (!this.guilds.length) {
        try {
          const data: any[] = await $fetch("/api/user/guilds", {
            credentials: "include",
          });

          this.setGuilds(data);
        } catch (e) {
          this.removeGuilds();
        }
      }
    },

    getGuildById(id: string) {
      return this.guilds.find((guild) => guild.id === id);
    },

    setGuilds(guilds: any[]) {
      this.guilds = guilds;
    },
    removeGuilds() {
      this.guilds = [];
    },
  },
});
