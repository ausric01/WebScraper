import { z } from "zod";

import { scrape } from "../../services/scraper";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { decode } from "../../services/hasher";

export const crawlerRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      try {
        const query = decode(input.query);
        const html = await scrape(query);
        //
        return {
          html: html,
          error: null,
        };
      } catch (err) {
        return {
          html: null,
          error: "Something went wrong",
        };
      }
    }),
});
