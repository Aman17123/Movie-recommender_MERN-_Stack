import dotenv from "dotenv";
dotenv.config(); // MUST be first

import Fastify from "fastify";
import cors from "@fastify/cors";
import recommendRoute from "./routes/recommend.js";

const fastify = Fastify({ logger: true });

await fastify.register(cors, { origin: "*" });

fastify.register(recommendRoute);

fastify.listen({ port: 5000 }, () => {
  console.log("🚀 Server running on http://localhost:5000");
  console.log("API KEY LOADED:", !!process.env.OPENAI_API_KEY);
});
