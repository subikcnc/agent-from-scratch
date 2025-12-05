import { groq } from './groqai'

export const runLLM = async ({ userMessage }: { userMessage: string }) => {
  // Call the openai completion
  const response = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    temperature: 0.1, // How creative you want the model to be, reduces the randomness for less number
    messages: [{ role: 'user', content: userMessage }], // Array of objects that represent messages in this chat
  })

  return response.choices[0].message.content
}
