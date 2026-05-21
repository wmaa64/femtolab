import productsData from "../../../data/products";

function formatProducts(products) {
  return products.map((p) => `
Code: ${p.code}
Name: ${p.name.en} / ${p.name.ar}
Description: ${p.description.en} / ${p.description.ar}
Price: ${p.price}
`).join("\n");
}


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const productsContext = formatProducts(productsData);

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
                content: `
                    You are a professional sales assistant for femtolab.shop.

                    Your goals:
                    - Help customers find suitable products
                    - Recommend relevant items from the catalog
                    - Increase sales through smart recommendations
                    - Be concise, clear, and professional

                    Catalog:
                    ${productsContext}

                    Rules:
                    - Use ONLY products from the catalog
                    - Use Egyptian Pound (EGP) currency
                    - Always include:
                    - product name
                    - product code
                    - price
                    - If product not found:
                    say "This item is currently not available in our catalog."

                    Behavior:
                    - If customer asks generally, suggest suitable products
                    - If customer asks for cheap products, prioritize lower prices
                    - If customer asks for best products, prioritize featured or top-selling items
                    - Recommend alternatives when possible
                    - Keep answers short and organized
                    - Never invent products, prices, or specifications
                    - Reply in the same language used by the customer
                    - If customer writes Arabic, respond in Arabic
                    - If customer writes English, respond in English

                    Formatting:
                    - Use bullet points for product lists
                    - Separate each product clearly
                    - Mention availability positively

                    Sales style:
                    - Friendly and professional
                    - Helpful but not aggressive
                    - Encourage customer to ask more questions
                    `,
            },
            {
              role: "user",
              content: message,
            },
          ],
          temperature: 0.4,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        reply: data?.error?.message || "Groq API error",
      });
    }

    const reply = data?.choices?.[0]?.message?.content || "No response";

    return res.status(200).json({ reply });

} catch (error) {
    return res.status(500).json({ reply: error.message });
  }
}


/*
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {

    const { message } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",

      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant for FemtoTrade laboratory supplies company. Help customers find products and answer questions professionally.",
        },

        {
          role: "user",
          content: message,
        },
      ],
    });

    res.status(200).json({
      reply: completion.choices[0].message.content,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error generating response",
    });
  }
}

*/