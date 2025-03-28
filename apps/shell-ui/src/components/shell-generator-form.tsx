import { UseFormReturn } from 'react-hook-form'
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@workspace/ui'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui'
import { Button } from '@workspace/ui'
import { Textarea } from '@workspace/ui'
import { Card, CardContent } from '@workspace/ui'
import { z } from 'zod'

const formSchema = z.object({
  task: z.string().min(1, "Please select a task"),
  details: z.string().min(5, "Please provide more details"),
  technologies: z.array(z.string()).default([]),
})

type FormValues = z.infer<typeof formSchema>

interface ShellGeneratorFormProps {
  form: UseFormReturn<FormValues>
  onSubmit: (data: FormValues) => Promise<void>
  isLoading: boolean
  onRemoveTechnology: (tech: string) => void
  onAddTechnology: () => void
}

export default function ShellGeneratorForm({
  form,
  onSubmit,
  isLoading,
  onRemoveTechnology,
  onAddTechnology
}: ShellGeneratorFormProps) {
  return (
    <Card className="bg-slate-900 rounded-lg shadow overflow-hidden">
      <CardContent className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-white">Shell Script Generator</h3>
        <div className="mt-2 max-w-xl text-sm text-slate-400">
          <p>Enter your requirements for a shell script and our AI will generate it for you.</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-4">
            <FormField
              control={form.control}
              name="task"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-slate-300">Task Description</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-700 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md bg-slate-800 text-slate-300">
                        <SelectValue placeholder="Select a task" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Create a new app in the monorepo">Create a new app in the monorepo</SelectItem>
                      <SelectItem value="Create a new backend service">Create a new backend service</SelectItem>
                      <SelectItem value="Add a new package to the workspace">Add a new package to the workspace</SelectItem>
                      <SelectItem value="Setup TypeScript configuration">Setup TypeScript configuration</SelectItem>
                      <SelectItem value="Configure pnpm workspaces">Configure pnpm workspaces</SelectItem>
                      <SelectItem value="Custom script">Custom script</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-slate-300">Additional Details</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={7}
                      className="mt-1 block w-full border-slate-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-slate-800 text-slate-300"
                      placeholder="Describe what you want the script to do, include specific requirements..."
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div>
              <label htmlFor="tech" className="block text-sm font-medium text-slate-300">Technologies</label>
              <div className="mt-1">
                <div className="flex flex-wrap gap-2">
                  {form.watch("technologies").map((tech) => (
                    <span key={tech} className={getTagColorClass(tech)}>
                      {tech}
                      <button
                        type="button"
                        onClick={() => onRemoveTechnology(tech)}
                        className={getTagButtonClass(tech)}
                      >
                        <span className="sr-only">Remove {tech}</span>
                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </span>
                  ))}
                  <button
                    type="button"
                    onClick={onAddTechnology}
                    className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-slate-800 text-slate-300 hover:bg-slate-700"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : "Generate Script"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

function getTagColorClass(tech: string): string {
  switch (tech) {
    case 'TypeScript':
      return 'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-cyan-900 text-cyan-200';
    case 'Next.js':
      return 'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-pink-900 text-pink-200';
    case 'Express.js':
      return 'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-900 text-indigo-200';
    case 'Tailwind CSS':
      return 'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-teal-900 text-teal-200';
    default:
      return 'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-900 text-gray-200';
  }
}

function getTagButtonClass(tech: string): string {
  switch (tech) {
    case 'TypeScript':
      return 'ml-1.5 inline-flex flex-shrink-0 h-4 w-4 rounded-full text-cyan-400 hover:bg-cyan-800 hover:text-cyan-200 focus:outline-none focus:bg-cyan-800 focus:text-cyan-200';
    case 'Next.js':
      return 'ml-1.5 inline-flex flex-shrink-0 h-4 w-4 rounded-full text-pink-400 hover:bg-pink-800 hover:text-pink-200 focus:outline-none focus:bg-pink-800 focus:text-pink-200';
    case 'Express.js':
      return 'ml-1.5 inline-flex flex-shrink-0 h-4 w-4 rounded-full text-indigo-400 hover:bg-indigo-800 hover:text-indigo-200 focus:outline-none focus:bg-indigo-800 focus:text-indigo-200';
    case 'Tailwind CSS':
      return 'ml-1.5 inline-flex flex-shrink-0 h-4 w-4 rounded-full text-teal-400 hover:bg-teal-800 hover:text-teal-200 focus:outline-none focus:bg-teal-800 focus:text-teal-200';
    default:
      return 'ml-1.5 inline-flex flex-shrink-0 h-4 w-4 rounded-full text-gray-400 hover:bg-gray-800 hover:text-gray-200 focus:outline-none focus:bg-gray-800 focus:text-gray-200';
  }
}
