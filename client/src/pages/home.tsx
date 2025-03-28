import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../lib/queryClient";
import { useToast } from "../hooks/use-toast";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { X } from "lucide-react";

// Define form schema
const scriptFormSchema = z.object({
  task: z.string().min(1, "Task description is required"),
  details: z.string().default(""),
  technologies: z.array(z.string()).default([]),
  newTechnology: z.string().optional(),
});

type ScriptFormValues = z.infer<typeof scriptFormSchema>;

// Predefined task options
const taskOptions = [
  "Create a new app in the monorepo",
  "Create a new backend service",
  "Add a new package to the workspace",
  "Setup TypeScript configuration",
  "Configure pnpm workspaces",
  "Custom script"
];

export default function Home() {
  const { toast } = useToast();
  const [generatedScript, setGeneratedScript] = React.useState<string | null>(null);
  
  // Setup form
  const form = useForm<ScriptFormValues>({
    resolver: zodResolver(scriptFormSchema),
    defaultValues: {
      task: "",
      details: "",
      technologies: [],
      newTechnology: "",
    },
  });

  // Setup mutation
  const generateScriptMutation = useMutation({
    mutationFn: async (values: ScriptFormValues) => {
      const { newTechnology, ...data } = values;
      // Make sure we're using the correct port for the shell-ai service
      const response = await apiRequest<{ script: string }>({
        url: `/api/generate-script`, // Use a relative URL to avoid CORS issues
        method: "POST",
        data,
      });
      return response;
    },
    onSuccess: (data) => {
      setGeneratedScript(data.script);
      toast({
        title: "Script Generated",
        description: "Your shell script has been generated successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate script. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Handle form submission
  const onSubmit = async (values: ScriptFormValues) => {
    generateScriptMutation.mutate(values);
  };

  // Add a new technology
  const addTechnology = () => {
    const newTech = form.getValues("newTechnology");
    if (newTech && !form.getValues("technologies").includes(newTech)) {
      form.setValue("technologies", [...form.getValues("technologies"), newTech]);
      form.setValue("newTechnology", "");
    }
  };

  // Remove a technology
  const removeTechnology = (tech: string) => {
    form.setValue(
      "technologies",
      form.getValues("technologies").filter((t) => t !== tech)
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        AI Shell Script Generator
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Generate Shell Script</CardTitle>
            <CardDescription>
              Fill in the details below to generate a shell script for your project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="task"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Task Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a task type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {taskOptions.map((task) => (
                            <SelectItem key={task} value={task}>
                              {task}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the type of script you want to generate
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide any specific requirements or constraints"
                          className="resize-none h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Include details like specific features, dependencies, or configuration preferences
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel>Technologies</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {form.getValues("technologies").map((tech) => (
                      <Badge key={tech} variant="secondary" className="py-1 px-3">
                        {tech}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 ml-2"
                          onClick={() => removeTechnology(tech)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add technology (e.g., React, TypeScript)"
                      value={form.watch("newTechnology")}
                      onChange={(e) => form.setValue("newTechnology", e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTechnology();
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={addTechnology}>
                      Add
                    </Button>
                  </div>
                  <FormDescription>
                    Add technologies that your script should support
                  </FormDescription>
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={generateScriptMutation.isPending}
                >
                  {generateScriptMutation.isPending ? "Generating..." : "Generate Script"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Script</CardTitle>
            <CardDescription>
              Your generated shell script will appear here
            </CardDescription>
          </CardHeader>
          <CardContent>
            {generatedScript ? (
              <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-auto text-sm max-h-[500px]">
                <code>{generatedScript}</code>
              </pre>
            ) : (
              <div className="text-center p-12 text-muted-foreground">
                <p>Fill out the form and click "Generate Script" to see your script here</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            {generatedScript && (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    navigator.clipboard.writeText(generatedScript);
                    toast({
                      title: "Copied to clipboard",
                      description: "The script has been copied to your clipboard.",
                    });
                  }}
                >
                  Copy to Clipboard
                </Button>
                <Button 
                  variant="secondary"
                  onClick={() => setGeneratedScript(null)}
                >
                  Clear
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}