import { defineAction, z, ActionError, getApiContext } from "astro:actions";

export const server = {
  // click action
  click: defineAction({
    input: z.object({
      name: z.string(),
      massage: z.string(),
    }),
    handler: async ({ name }) => {
      console.log(`Received name: ${name}`);
      return { success: true, data: `Hello ${name}` };
    },
  }),
  signUp: defineAction({
    accept: "form",
    input: z.object({
      username: z.string(),
      email: z.string().email(),
      password: z.string().min(8),
    }),
    handler: async ({ username, email, password }) => {
      console.log(`Received username: ${username}, email: ${email}`);
      return { success: true };
    },
  }),
  newsletter: defineAction({
    accept: "form",
    input: z.object({
      email2: z.string().email(),
      receivePromo: z.boolean(),
    }),
    handler: async ({ email2, receivePromo }) => {
      // call a mailing service, or store to a database
      return { success: true };
    },
  }),
  customError: defineAction({
    input: z.object({
      name: z.string(),
    }),
    handler: async ({ name }) => {
      const { cookies } = getApiContext();
      console.log(`cookies: ${cookies.get("refreshToken")?.value}`);
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "Custom error message",
      });
    },
  }),
};