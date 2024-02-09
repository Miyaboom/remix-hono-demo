import { Hono } from "hono";
import { handle } from "hono/cloudflare-pages";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono();

const route = app.get(
  "/api/posts/",
  zValidator(
    "query",
    z.object({
      page: z.string().optional(),
    })
  ),
  (c) => {
    return c.json([
      {
        title: "Morning",
        body: "Time to wake up",
      },
      {
        title: "Night",
        body: "Time to sleep",
      },
    ]);
  }
);

export type AppType = typeof route;

export const onRequest = handle(app);
