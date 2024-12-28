"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { CreateProject } from "@/utils/Project.util"
import { ProjectSchema } from "@/schema/project"
import { toast } from "@/hooks/use-toast"

export default function CreateProjectUI() {
    const [project, setProject] = useState<ProjectSchema>({ project_name: "", project_description: "", project_external_api_secret: "", project_base_api_url: "" })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setProject(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Submit project
            const response = await CreateProject(project)
            if (!response.ok) {
                throw new Error("Failed to create project");
            }
            console.log(response.data)
            // Reset form after submission
            setProject({ project_name: "", project_description: "", project_external_api_secret: "", project_base_api_url: "" })
            toast({
                title: "Project created successfully",
                description: "Your project has been created successfully.",
            })
        } catch (error) {
            console.log("Error submitting project:", error)
            console.error("Error submitting project:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex w-full flex items-center justify-center">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>Create New Project</CardTitle>
                    <CardDescription>Fill in the details to create a new project.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="project_name">Project Name</Label>
                            <Input
                                id="project_name"
                                name="project_name"
                                value={project.project_name}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="project_description">Project Description</Label>
                            <Textarea
                                id="project_description"
                                name="project_description"
                                value={project.project_description}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="project_external_api_secret">External API Secret</Label>
                            <Input
                                id="project_external_api_secret"
                                name="project_external_api_secret"
                                value={project.project_external_api_secret}
                                onChange={handleChange}
                                required
                                type="password"
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="project_base_api_url">Exteral API base API url</Label>
                            <Input
                                id="project_base_api_url"
                                name="project_base_api_url"
                                value={project.project_base_api_url}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating Project...
                                </>
                            ) : (
                                'Create Project'
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

