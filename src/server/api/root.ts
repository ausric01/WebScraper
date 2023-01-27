import { createTRPCRouter } from "./trpc";
import { crawlerRouter } from "./routers/crawler";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  crawler: crawlerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
