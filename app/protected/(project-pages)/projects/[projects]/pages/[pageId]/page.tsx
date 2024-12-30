"use client"
import PageEditor from "@/components/page/PageEditor";
import { FetchProjectDetail } from "@/utils/Project.util";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface DetailPageProps {
    params: Promise<{ projects: string, pageId: string }>;
}

interface PageData {
    pageUrl: string;
    pageDescription: string;
    createdAt: string;
}

export default function PageData({ params }: DetailPageProps) {
    const [pageId, setPageId] = useState("")
    const [pageData, setPageData] = useState<PageData>()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPageId = async () => {
            setLoading(true);
            const { pageId } = await params;
            setPageId(pageId);
            setLoading(false);
        }
        fetchPageId();
    }, [])

    useEffect(() => {
        const fetchPageData = async () => {
            setLoading(true);

            const { projects } = await params;
            const response = await FetchProjectDetail(projects);
            if (!response.ok) {
                throw new Error("Page not found");
            }
            if (!response.data) {
                return;
            }
            if (pageId === "") {
                return;
            }
            const externalData = await fetch(
                response.data.project_base_api_url + "/external/page-data",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        EXTERNAL_API_SECRET: "test123",
                    },
                    body: JSON.stringify({ pageId: pageId, EXTERNAL_API_SECRET: "test123" }),
                }
            );
            const externalResponse = await externalData.json();
            setPageData(externalResponse.page)
            setLoading(false);
        }
        fetchPageData();
    }, [pageId])

    if (loading) {
        return (
            <div className="w-full h-96 flex items-center justify-center">
                <div>
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-sm text-gray-500">Loading pages...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!pageData) {
        return <div>Page Not Found</div>
    }

    return (
        <div>
            <div className="p-10 pb-0">
                <div className="text-2xl ">Editing {pageData.pageUrl} page</div>
                <div className="text-sm text-foreground/50">{pageData.pageDescription}</div>
            </div>
            <div className="m-10 border rounded-xl">
                <DndProvider backend={HTML5Backend}>
                    <PageEditor />
                </DndProvider>
            </div>
        </div>
    )
}