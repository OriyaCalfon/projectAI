
import OpenAI from "openai";

let openai;

if (import.meta.env.VITE_API_KEY) {
  openai = new OpenAI({
    apiKey: import.meta.env.VITE_API_KEY,
    dangerouslyAllowBrowser: true
  });
} else {
  console.warn("No API key found. Skipping OpenAI setup.");
}


export async function main(event, inputs, temperature) {
  const messages = [
    {
      role: "system",
      content: "You are a helpful assistant designed to output JSON.",
    },
    { role: "user", content: `I need a blessing for a ${event} event.` },
  ];

  Object.keys(inputs).forEach(key => {
    messages.push({ role: "user", content: `${key}: ${inputs[key]}` });
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: messages,
      max_tokens: 150,
      n: 3,
      temperature: temperature,
    });


    const responses = completion.choices.map(choice => choice.message.content);
    console.log("Responses from OpenAI:", responses);
    return responses;


  } catch (error) {
    console.error("Error fetching completion:", error);
    return "Error fetching completion";
  }
}

