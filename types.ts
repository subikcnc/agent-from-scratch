export type AIMessage =
  | { role: 'user'; content: string }
  | { role: 'tool'; content: string; tool_call_id: string }
  | { role: 'assistant'; content: string | null; tool_calls?: any[] }

export interface ToolFn<A = any, T = any> {
  (input: { userMessage: string; toolArgs: A }): Promise<T>
}

export type Tool = {
  type: 'function'
  function: {
    name: string
    description: string
    parameters: {
      type: 'object'
      properties: object
      required: string[]
    }
  }
}
