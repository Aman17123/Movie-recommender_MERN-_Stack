import Fastify from "fastify";
import cors from "@fastify/cors";
import recommendRoute from "./routes/recommend.js";
import dotenv from "dotenv";

dotenv.config();

const fastify = Fastify({ logger: true });

await fastify.register(cors, {
  origin: "*",
});

fastify.register(recommendRoute);

const start = async () => {
  try {
    await fastify.listen({ port: 5000 });
    console.log("Server running on http://localhost:5000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
