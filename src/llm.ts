import type { AIMessage } from '../types'
import { groq } from './groqai'

export const runLLM = async ({messages, tools}: {messages: AIMessage[], tools: any[]}) => {
  // Call the openai completion
  const response = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    temperature: 0.1, // How creative you want the model to be, reduces the randomness for less number
    messages, // Array of objects that represent messages in this chat
    tools,
    tool_choice: 'auto',
    parallel_tool_calls: false,
  })
  // If we are calling tools, there will not be content, it will be null so we just return the message
  return response.choices[0].message
}
