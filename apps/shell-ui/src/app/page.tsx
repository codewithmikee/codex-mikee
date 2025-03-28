'use client'

import { useState } from 'react'
import Sidebar from '@/components/sidebar'
import ShellGeneratorForm from '@/components/shell-generator-form'
import OutputPreview from '@/components/output-preview'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { generateScript } from '@/lib/api'

const formSchema = z.object({
  task: z.string().min(1, "Please select a task"),
  details: z.string().min(5, "Please provide more details"),
  technologies: z.array(z.string()).default([]),
})

type FormValues = z.infer<typeof formSchema>

export default function Home() {
  const [scriptOutput, setScriptOutput] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [showTerminal, setShowTerminal] = useState(false)
  const [terminalOutput, setTerminalOutput] = useState<string[]>([])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: "Create a new app in the monorepo",
      details: "",
      technologies: ["TypeScript", "Next.js", "Express.js"]
    }
  })

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    
    try {
      // Show terminal with initial message
      setShowTerminal(true)
      setTerminalOutput(prev => [...prev, `$ pnpm run generate-script ${data.task.toLowerCase().replace(/ /g, '-')}`])
      
      const script = await generateScript({
        task: data.task,
        details: data.details,
        technologies: data.technologies
      })
      
      setScriptOutput(script)
      
      // Add some simulated terminal output
      setTerminalOutput(prev => [
        ...prev,
        "=== AI Workspace Monorepo - Script Generator ===",
        `Generating script for: ${data.task}`,
        "Processing task details...",
        "Applying TypeScript configurations...",
        "Script generation complete!",
        "$ _"
      ])
    } catch (error) {
      console.error("Error generating script:", error)
      setScriptOutput("# Error generating script\n\nThere was an error generating your script. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveTechnology = (tech: string) => {
    const currentTechs = form.getValues("technologies")
    form.setValue("technologies", currentTechs.filter(t => t !== tech))
  }

  const handleAddTechnology = () => {
    // This would typically open a dialog or dropdown to select technologies
    const newTech = "Tailwind CSS"
    const currentTechs = form.getValues("technologies")
    if (!currentTechs.includes(newTech)) {
      form.setValue("technologies", [...currentTechs, newTech])
    }
  }

  return (
    <>
      <Sidebar />
      
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-slate-900 shadow">
          <button 
            type="button" 
            className="px-4 text-slate-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500 md:hidden"
            onClick={() => {}} // Would typically toggle sidebar visibility
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <label htmlFor="search-field" className="sr-only">Search</label>
                <div className="relative w-full text-slate-400 focus-within:text-slate-300">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input id="search-field" className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-slate-300 placeholder-slate-400 bg-slate-800 focus:outline-none focus:placeholder-slate-300 focus:ring-0 focus:border-transparent sm:text-sm rounded-md" placeholder="Search workspace" type="search" name="search" />
                </div>
              </div>
            </div>
            
            <div className="ml-4 flex items-center md:ml-6">
              <button className="p-1 rounded-full text-slate-400 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
                <span className="sr-only">View notifications</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>

              <div className="ml-3 relative">
                <div>
                  <button type="button" className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-white">AI Workspace Shell Generator</h1>
              <p className="mt-1 text-sm text-slate-400">Generate shell scripts using AI with the proper monorepo structure.</p>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-4">
                {/* Tabs */}
                <div className="border-b border-slate-800">
                  <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <a href="#" className="border-cyan-500 text-cyan-400 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                      Shell Generator
                    </a>
                    <a href="#" className="border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-700 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                      File Structure
                    </a>
                    <a href="#" className="border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-700 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                      Documentation
                    </a>
                  </nav>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <ShellGeneratorForm 
                    form={form}
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                    onRemoveTechnology={handleRemoveTechnology}
                    onAddTechnology={handleAddTechnology}
                  />
                  
                  <OutputPreview script={scriptOutput} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Terminal Panel */}
      <div 
        id="script-panel" 
        className={`fixed inset-x-0 bottom-0 transform ${showTerminal ? '' : 'translate-y-full'} transition-transform duration-300 ease-in-out bg-slate-900 border-t border-slate-800 shadow-lg z-50 h-64 overflow-hidden`}
      >
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
            <h3 className="text-md font-medium text-white">Terminal</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              type="button" 
              className="text-slate-400 hover:text-slate-300"
              onClick={() => setShowTerminal(!showTerminal)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${showTerminal ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button 
              type="button" 
              className="text-slate-400 hover:text-slate-300"
              onClick={() => setShowTerminal(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-4 h-full overflow-auto font-mono text-sm text-slate-300 bg-slate-950 pb-16">
          {terminalOutput.map((line, i) => {
            // Colorize specific lines
            let className = "";
            if (line.startsWith("===")) className = "text-cyan-400";
            else if (line.startsWith("Generating")) className = "text-yellow-400";
            else if (line.startsWith("$")) className = "text-green-400";
            else if (line.includes("complete")) className = "text-green-400";
            else if (line.includes("error")) className = "text-red-400";
            else className = "text-gray-400";
            
            return <p key={i} className={className}>{line}</p>;
          })}
        </div>
      </div>
    </>
  )
}
