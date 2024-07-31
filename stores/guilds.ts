export const useGuilds = defineStore("guilds", {
  state: () => ({
    selectedGuild: "" as string,
    guilds: [] as Guilds,
  }),
  actions: {
    async fetchGuilds() {
      if (!this.guilds.length) {
        try {
          const data = await $fetch<Guilds>("/api/users/me/guilds", {
            credentials: "include",
          });

          this.setGuilds(data);
        } catch (e) {
          this.removeGuilds();
        }
      }
    },

    getGuildById(id: string) {
      return this.guilds.find((guild: Guild) => guild.id === id);
    },

    setGuilds(guilds: Guilds) {
      this.guilds = guilds;
    },
    removeGuilds() {
      this.guilds = [];
    },
  },
});
