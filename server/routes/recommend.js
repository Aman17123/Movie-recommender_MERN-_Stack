import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function routes(fastify, options) {
  fastify.post("/recommend", async (request, reply) => {
    const { user_input } = request.body;

    if (!user_input) {
      return reply.code(400).send({ error: "Input required" });
    }

    const prompt = `
    Recommend 5 movies based on this preference:
    "${user_input}"
    Only return movie names as a JSON array.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    let movies;
    try {
      movies = JSON.parse(completion.choices[0].message.content);
    } catch {
      movies = completion.choices[0].message.content.split("\n");
    }

    return { recommendations: movies };
  });
}

export default routes;
