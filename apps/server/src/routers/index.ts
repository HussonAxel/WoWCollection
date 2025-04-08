import { protectedProcedure, publicProcedure, router } from "../lib/trpc";
import { blizzardRouter } from "./blizzard";


export const appRouter = router({
	healthCheck: publicProcedure.query(() => {
		return "OK";
	}),
	blizzard: blizzardRouter,
	privateData: protectedProcedure.query(({ ctx }) => {
		return {
			message: "This is private",
			user: ctx.session.user,
		};
	}),
	
});

export type AppRouter = typeof appRouter;
