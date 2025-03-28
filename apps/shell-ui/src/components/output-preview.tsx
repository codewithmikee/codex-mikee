'use client'

import { useState } from 'react'
import { Card } from '@workspace/ui'

interface OutputPreviewProps {
  script: string
}

export default function OutputPreview({ script }: OutputPreviewProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([script], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'generated-script.sh'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const defaultScript = `#!/bin/bash

# Generated shell script will appear here
# Fill out the form on the left and click "Generate Script"

echo "Hello from AI Workspace Shell Generator!"
`

  const displayScript = script || defaultScript

  return (
    <Card className="bg-slate-900 rounded-lg shadow overflow-hidden flex flex-col">
      <div className="px-4 py-5 sm:px-6 flex items-center justify-between border-b border-slate-800">
        <h3 className="text-lg leading-6 font-medium text-white">Generated Shell Script</h3>
        <div className="flex space-x-2">
          <button 
            type="button" 
            className="inline-flex items-center px-3 py-1 border border-slate-700 text-sm leading-4 font-medium rounded-md text-slate-300 bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500"
            onClick={handleCopy}
          >
            <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button 
            type="button" 
            className="inline-flex items-center px-3 py-1 border border-slate-700 text-sm leading-4 font-medium rounded-md text-slate-300 bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500"
            onClick={handleDownload}
          >
            <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download
          </button>
        </div>
      </div>
      <div className="px-1 py-1 flex-1 overflow-auto">
        <pre className="p-4 text-sm text-slate-300 bg-slate-950 rounded overflow-auto h-full">
          <code className="language-bash">{displayScript}</code>
        </pre>
      </div>
    </Card>
  )
}
