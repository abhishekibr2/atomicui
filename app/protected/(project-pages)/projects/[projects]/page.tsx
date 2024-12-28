"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectSchema } from "@/schema/project";
import { FetchProjectDetail } from "@/utils/Project.util";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({
    params,
}: {
    params: Promise<{ projects: string }>;
}) {
    const [slug, setSlug] = useState("");
    const [pageDetails, setPageDetails] = useState<ProjectSchema | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return "No date available";
        try {
            return formatDistanceToNow(new Date(dateString), { addSuffix: true });
        } catch (error) {
            return "Invalid date";
        }
    };

    useEffect(() => {
        const FetchProjectDetails = async () => {
            try {
                const { projects } = await params;
                setSlug(projects);
                const response = await FetchProjectDetail(projects);
                if (!response.ok) {
                    throw new Error('The project you are looking for does not exist');
                }
                setPageDetails(response.data);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to load page');
            } finally {
                setIsLoading(false);
            }
        };

        FetchProjectDetails();
    }, [params]);

    if (isLoading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center p-4">
                <div className="text-2xl text-muted-foreground text-center">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center p-4">
                <div className="text-2xl text-red-500 text=center">{error}</div>
                <Button onClick={() => router.back()}>Go Back</Button>
            </div>
        );
    }

    if (!pageDetails) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center p-4 flex-col gap-4">
                <div className="text-2xl text-red-500 text=center">Page not found</div>
                <Button onClick={() => router.push('/protected')}>Go Back</Button>
            </div>
        );
    }

    return (
        <div>
            <div className="min-h-screen w-full flex items-center justify-center p-4">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle className="text-3xl text-center">
                            {pageDetails?.project_name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-lg text-center text-muted-foreground">
                            {pageDetails?.project_description}
                        </div>
                        <div className="text-sm text-gray-400 text-center">Created At: {formatDate(pageDetails?.created_at)}</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}