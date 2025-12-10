import type { AIMessage } from '../types'
import { addMessages, getMessages, saveToolCallResponse } from './memory'
import { runLLM } from './llm'
import { showLoader, logMessage } from './ui'
import { runTool } from './toolRunner'

export const runAgent = async ({
  userMessage,
  tools,
}: {
  userMessage: string
  tools: any[]
}) => {
  await addMessages([{ role: 'user', content: userMessage }])

  const loader = showLoader('Thinking...')

  while (true) {
    let history = await getMessages()
    let response = await runLLM({ messages: history, tools })

    await addMessages([response])
    logMessage(response)
    if (response.content) {
      loader.stop()
      return getMessages()
    }
    if (response.tool_calls) {
      // If we have tool calls then we call the tool runner
      const toolCall = response.tool_calls[0]
      logMessage(response)
      loader.update(`Executing tool: ${toolCall.function.name}`)
      const toolResponse = await runTool(toolCall.function, userMessage)
      await saveToolCallResponse(toolCall.id, toolResponse)
      loader.update(`Executed tool: ${toolCall.function.name}`)
      console.log('Tool calls', response.tool_calls)
      console.log('------------------ Tool Response Log----------------')
      //   logMessage(response)
      console.log('------------------ Tool Response Log----------------')
    }
  }
}
