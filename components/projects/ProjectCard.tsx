"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Clock, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ProjectSchema } from "@/schema/project";
import { FetchProjects } from "@/utils/Project.util";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Define props interface for ProjectCard
interface ProjectCardProps {
    project: ProjectSchema;
}

// Make sure to export the component if it needs to be used in other files
const ProjectCard = ({ project }: ProjectCardProps) => {
    // Define the router object
    const router = useRouter();
    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return "No date available";
        try {
            return formatDistanceToNow(new Date(dateString), { addSuffix: true });
        } catch (error) {
            return "Invalid date";
        }
    };

    const formatDetailedDate = (dateString: string | undefined) => {
        if (!dateString) return "No date available";
        try {
            return new Date(dateString).toLocaleDateString();
        } catch (error) {
            return "Invalid date";
        }
    };

    return (
        <Card className="hover:shadow-lg transition-shadow duration-200 hover:cursor-pointer">
            <Link href={`/protected/projects/${project.id}`} >
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span className="truncate">{project.project_name}</span>
                        <span className="text-sm text-muted-foreground">#{project.id}</span>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {formatDate(project.created_at)}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-start gap-2">
                            <FileText className="h-4 w-4 mt-1 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {project.project_description || "No description available"}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <time className="text-sm text-muted-foreground">
                                {formatDetailedDate(project.created_at)}
                            </time>
                        </div>
                    </div>
                </CardContent>
            </Link>
        </Card >
    );
};

export default function ProtectedPage() {
    const [projects, setProjects] = useState<ProjectSchema[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjectsUI = async () => {
            try {
                const response = await FetchProjects();
                if (!response.ok) {
                    toast({
                        title: "Error fetching projects",
                        description: "Please try again later",
                        variant: "destructive",
                    });
                    setProjects([]);
                    return;
                }
                setProjects(response.data ?? []);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "An unexpected error occurred",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProjectsUI();
    }, []);

    return (
        <div className="container mx-auto py-8 space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                <span className="text-sm text-muted-foreground">
                    {projects.length} project{projects.length !== 1 ? "s" : ""}
                </span>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <Card key={i} className="animate-pulse">
                            <CardHeader>
                                <div className="h-6 bg-muted rounded w-3/4"></div>
                                <div className="h-4 bg-muted rounded w-1/2"></div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="h-4 bg-muted rounded"></div>
                                    <div className="h-4 bg-muted rounded w-1/2"></div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : projects.length > 0 ? (
                <ScrollArea className="h-[calc(100vh-12rem)]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                            />
                        ))}
                    </div>
                </ScrollArea>
            ) : (
                <Card className="p-8 text-center">
                    <CardContent>
                        <p className="text-muted-foreground">No projects found</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}