"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/project-sidebar";
import { useEffect, useState } from "react";
import { FetchProjectDetail } from "@/utils/Project.util";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ projects: string }>;
}>) {

    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const FetchProjectDetails = async () => {
            try {
                const { projects } = await params;
                const response = await FetchProjectDetail(projects);
                if (!response.ok) {
                    throw new Error('Page not found');
                }
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to load page');
                console.log(error instanceof Error ? error.message : 'Failed to load page');
            }
        };

        FetchProjectDetails();
    }, [params]);


    if (error) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center p-4">
                <div className="text-2xl text-red-500 text=center">{error}</div>
                <Button onClick={() => router.back()}>Go Back</Button>
            </div>
        );
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="min-h-full w-full">
                {children}
            </div>
        </SidebarProvider>
    );
}
