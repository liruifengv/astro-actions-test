import { defineAction, z } from "astro:actions";

export const server = {
  click: defineAction({
    input: z.object({
      name: z.string(),
    }),
    handler: async ({ name }) => {
      console.log(`Received name: ${name}`);
      return { success: true };
    },
  }),
};