import 'dotenv/config'
import { runAgent } from './src/agent'
import { zodToJsonSchema } from 'zod-to-json-schema'
import { z } from 'zod'

const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

// Define the schema
const stuffSchema = z.object({
    city: z.string(),
    reasoning: z.string().describe('why did you pick this tool?')
})

const stuffTool = {
    type: 'function',
    function: {
        name: 'get_stuff',
        description: 'Use this to get the weather and only the weather',
        parameters: zodToJsonSchema(stuffSchema, "stuffTool"),
    }
}

// const tools = [
//   {
//     type: 'function',
//     function: {
//       name: 'system_time',
//       description: 'Get the current system time',
//       parameters: {
//         type: 'object',
//         properties: {},
//         required: [],
//       },
//     },
//   },
// ]

const tools: any[] = [stuffTool]

const response = await runAgent({userMessage, tools})
console.log(response)
