import { ScriptRequest } from '@workspace/shared'

export async function generateScript(request: ScriptRequest): Promise<string> {
  try {
    const response = await fetch('http://localhost:8000/api/generate-script', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error(`Failed to generate script: ${response.statusText}`)
    }

    const data = await response.json()
    return data.script
  } catch (error) {
    console.error('Error generating script:', error)
    throw error
  }
}
