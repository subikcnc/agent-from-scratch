import type { AIMessage } from '../types'
import { addMessages, getMessages } from './memory'
import { runLLM } from './llm'
import { showLoader, logMessage } from './ui'


export const runAgent = async ({userMessage, tools}: {userMessage: string, tools: any[]}) => {
    await addMessages([{role: 'user', content: userMessage}])

    const loader = showLoader('Thinking...')
    let history = await getMessages();
    let response = await runLLM({messages: history, tools})
    if(response.tool_calls) {
        console.log('Tool calls', response.tool_calls)
    }
    await addMessages([response])
    // logMessage(response)

    // while(response.tool_calls) {
    //     const toolCall = response.tool_calls[0]
    //     loader.update(`Executing: ${toolCall.function.name}`)
    //     const toolOutput = await runTool(toolCall, userMessage)
        
    //     await addMessages([toolOutput])
    //     loader.update(`Done: ${toolCall.function.name}`)
        
    //     history = await getMessages()
    //     response = await runLLM({messages: history, tools})
         
    //     await addMessages([response])
    //     logMessage(response)
    // }
    
    loader.stop()
    return getMessages();
}