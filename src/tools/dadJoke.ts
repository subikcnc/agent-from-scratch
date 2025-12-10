import { z } from 'zod'
import fetch from 'node-fetch'
import zodToJsonSchema from 'zod-to-json-schema'
import type { ToolFn } from '../../types'

const dadJokeSchema = z.object({})

export const dadJokeTool = {
  type: 'function',
  function: {
    name: 'dad_joke',
    description: 'get a dad joke',
    parameters: zodToJsonSchema(dadJokeSchema, 'dadJokeTool'),
  },
}

type Args = z.infer<typeof dadJokeSchema>

export const dadJoke: ToolFn<Args, string> = async ({ toolArgs }) => {
  const res = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json',
    },
  })

  return (await res.json()).joke
}
