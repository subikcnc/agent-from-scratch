import type { AIMessage } from '../types'

export const runTool = async (
  toolCall: {
    function: { name: string; arguments: string }
    id: string
  },
  userMessage: string
): Promise<AIMessage> => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments),
  }

  // TODO: Map tool names to actual functions here
  // For now we just return a mock response
  let result 
  
  switch (toolCall.function.name) {
    case 'system_time':
      result = new Date().toISOString()
      break
    case 'get_weather':
      const { city } = input.toolArgs
      result = `The weather in ${city} is sunny`
      break
    default:
      result = `Unknown tool: ${toolCall.function.name}`
  }

  return {
    role: 'tool',
    tool_call_id: toolCall.id,
    content: result,
  }
}
