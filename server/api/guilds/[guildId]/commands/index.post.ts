export default defineEventHandler(async (event): Promise<object> => {
  const config = useRuntimeConfig();

  const { guildId } = getRouterParams(event);

  const body = await readBody(event);

  if (!body.trigger || !body.response) {
    return {
      status: 400,
      body: {
        message: "Invalid command",
      },
    };
  }

  const response = await $fetch(
    `${config.backendUrl}/api/guilds/${guildId}/commands`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${event.context.token}`,
      },
      body: JSON.stringify(body),
    },
  ).catch((error) => {
    return {
      status: 400,
      error: error.data.error,
    };
  });

  if ((response as { status: number }).status === 400) { // TODO: Fix this type assertion
    return new Response(JSON.stringify(response), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return response;
});
