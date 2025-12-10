import { dadJoke } from './tools/dadJoke'
import { reddit } from './tools/reddit'

export const getWeather = async ({
  toolArgs,
}: {
  toolArgs: { city: string }
}) => {
  const { city } = toolArgs
  return `It is hot, the temperature is 90deg in ${city}`
}

export const runTool = async (
  toolCall: { name: string; arguments: any },
  userMessage: string
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.arguments),
  }

  switch (toolCall.name) {
    case 'getWeather':
      return getWeather(input)
    case 'dad_joke':
      return dadJoke(input)
    case 'reddit':
      return reddit(input)

    default:
      throw new Error(`Unknown tool: ${toolCall.name}`)
  }
}
