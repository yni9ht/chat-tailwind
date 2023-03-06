import type {APIContext, APIRoute} from 'astro';

const API_KEY = import.meta.env.OPENAI_API_KEY

const HTTP_PROXY = import.meta.env.HTTP_PROXY

interface ChatGPTResponse {
    id: string
    object: string
    created: number
    model: string
    choices: Choice[]
}

interface Choice {
    index: 0,
    message: {
        role: string
        content: string
    }
}

export const post: APIRoute = async function post(context: APIContext) {
    const body = await context.request.json()

    const {messages} = body

    const payload = {
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.5,
    }

    // const proxyAgent = new ProxyAgent(HTTP_PROXY)

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
        },
        // dispatcher: proxyAgent,
        body: JSON.stringify(payload),
    })

    const rb = await response.json() as ChatGPTResponse

    const {created, choices} = rb

    if (!choices || choices.length === 0) {
        return {
            status: 500,
            body: 'No choices returned',
        }
    }
    const choice = choices[0]
    const message = choice.message

    console.log('message', message)

    return {
        body: JSON.stringify(message),
    }
}