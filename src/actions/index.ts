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
  test: defineAction({
    input: z.object({
      test: z.string(),
    }),
    handler: async ({ test }) => {
      console.log(`Received test: ${test}`);
      return { success: true };
    },
  }),
};