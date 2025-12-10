import type { ToolFn } from '../../types'
import z from 'zod'
import fetch from 'node-fetch'
import zodToJsonSchema from 'zod-to-json-schema'

export const redditSchema = z.object({})

export const redditTool = {
  type: 'function',
  function: {
    name: 'reddit',
    description: '',
    parameters: zodToJsonSchema(redditSchema, 'redditTool'),
  },
}

type Args = z.infer<typeof redditSchema>

export const reddit: ToolFn<Args, string> = async ({ toolArgs }) => {
  const { data } = await fetch(
    'https://www.reddit.com/r/ClashRoyale/.json'
  ).then((res) => res.json())

  const relevantInfo = data.children.map((child: any) => ({
    title: child.data.title,
    link: child.data.url,
    subreddit: child.data.subreddit_name_prefixed,
    author: child.data.author,
    upvotes: child.data.ups,
  }))

  return JSON.stringify(relevantInfo, null, 2)
}
