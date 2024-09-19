import { FetchError } from "ofetch";

export default defineEventHandler(async (event): Promise<object> => {
  const config = useRuntimeConfig();
  const { guildId } = getRouterParams(event);
  const body = await readBody(event);

  if (!body.trigger || !body.response) {
    return {
      status: 400,
      body: {
        message: "Invalid command: 'trigger' and 'response' are required.",
      },
    };
  }

  try {
    const response = await $fetch(
      `${config.backendUrl}/api/guilds/${guildId}/commands`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${event.context.token}`,
        },
        body: JSON.stringify(body),
      },
    );

    return response;
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred.";
    if (error instanceof FetchError) {
      if (error.data && error.data.error) {
        errorMessage = error.data.error;
      } else if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage =
              "Bad Request: The server could not understand the request.";
            break;
          case 401:
            errorMessage =
              "Unauthorized: Access is denied due to invalid credentials.";
            break;
          case 403:
            errorMessage =
              "Forbidden: You do not have permission to access this resource.";
            break;
          case 404:
            errorMessage =
              "Not Found: The requested resource could not be found.";
            break;
          case 500:
            errorMessage =
              "Internal Server Error: An error occurred on the server.";
            break;
          default:
            errorMessage = `Error: ${error.response.statusText}`;
        }
      }
    }

    return new Response(
      JSON.stringify({
        status:
          error instanceof FetchError && error.response
            ? error.response.status
            : 500,
        message: errorMessage,
      }),
      {
        status:
          error instanceof FetchError && error.response
            ? error.response.status
            : 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
});
