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
const weatherSchema = z.object({
    city: z.string()
})

const weatherTool = {
    type: 'function',
    function: {
        name: 'get_stuff',
        description: 'Use this function to get the weather',
        parameters: zodToJsonSchema(weatherSchema, "weatherTool"),
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

const tools: any[] = [weatherTool]

const response = await runAgent({userMessage, tools})
console.log(response)
