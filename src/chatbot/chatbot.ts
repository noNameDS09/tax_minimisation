import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";

export async function Chatbot(userPrompt: string) {
  const llm = new ChatGoogleGenerativeAI({
    modelName: "gemini-1.5-pro",
    apiKey: "API"
  });

  const template = `
    You are an AI assistant designed to provide financial advice and tax-saving strategies. 
    Respond to user queries in a concise and professional manner. 
    If the user asks about tax-saving tips, suggest tax-deferred accounts, tax-loss harvesting, or charitable donations. 
    If the user asks about investments, offer diversified portfolio recommendations based on risk level.

    User: {prompt}
    AI:
  `;

  const promptTemplate = new PromptTemplate({
    template,
    inputVariables: ["prompt"],
  });

  const chain = promptTemplate.pipe(llm);

  try {
    const output = await chain.invoke({ prompt: userPrompt });
    //console.log("Chatbot Response:", output.content);
    return output.content;
  } catch (error) {
    console.error("Error in chatbot response:", error);
    return "I'm sorry, I couldn't process your request.";
  }
}


async function runChatbot(){
    const response = await Chatbot('Should I invest in stocks or real estate');
    console.log(response);
}

runChatbot();
