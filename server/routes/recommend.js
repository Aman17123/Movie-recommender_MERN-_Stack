import OpenAI from "openai";

async function routes(fastify, options) {
  fastify.post("/recommend", async (request, reply) => {
    try {
      const { user_input } = request.body;

      if (!user_input) {
        return reply.code(400).send({ error: "Input required" });
      }

      // ✅ Create client INSIDE the request
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      if (!process.env.OPENAI_API_KEY) {
        return reply.code(500).send({
          error: "API key not loaded from environment",
        });
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Recommend 5 movies based on: "${user_input}".
Return ONLY a JSON array of movie names.`,
          },
        ],
        temperature: 0.7,
      });

      let recommendations;
      try {
        recommendations = JSON.parse(
          completion.choices[0].message.content
        );
      } catch {
        recommendations = completion.choices[0].message.content
          .split("\n")
          .filter(Boolean);
      }

      return { recommendations };
    } catch (err) {
      console.error(err);
      return reply.code(500).send({
        error: "Failed to get recommendations",
      });
    }
  });
}

export default routes;
