"use client"

import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Loader2 } from 'lucide-react';
import PageEditor from "@/components/page/PageEditor";
import { FetchProjectDetail } from "@/utils/Project.util";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PageSchema } from '@/schema/page';
import { toast } from '@/hooks/use-toast';
import moment from 'moment';

interface DetailPageProps {
    params: Promise<{ projects: string; pageId: string }>;
}

export default function PageData({ params }: DetailPageProps) {
    const [loading, setLoading] = useState(true);
    const [pageId, setPageId] = useState("");
    const [pageData, setPageData] = useState<PageSchema | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchPageId = async () => {
            const { pageId } = await params;
            setPageId(pageId);
        };
        fetchPageId();
    }, []);

    useEffect(() => {
        const fetchPageData = async () => {
            if (!pageId) return;

            setLoading(true);
            try {
                const { projects } = await params;
                const response = await FetchProjectDetail(projects);

                if (!response.ok || !response.data) {
                    throw new Error("Project not found");
                }

                const externalData = await fetch(
                    `${process.env.NEXT_PUBLIC_LOCAL_BASE_API_URL || response.data.project_base_api_url}/external/page/get-page`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            EXTERNAL_API_SECRET: "test123",
                        },
                        body: JSON.stringify({ pageId, EXTERNAL_API_SECRET: "test123" }),
                    }
                );
                const externalResponse = await externalData.json();
                // Update to handle the nested data structure
                setPageData(externalResponse.page.data);
            } catch (error) {
                console.error("Error fetching page data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPageData();
    }, [pageId]);

    const handleInputChange = (field: keyof PageSchema, value: any) => {
        if (!pageData) return;
        setPageData({ ...pageData, [field]: value });
    };

    const handleSave = async () => {
        if (!pageId) return;

        setIsSaving(true);
        try {
            // Create an ISO string timestamp
            const now = new Date().toISOString();

            const pageDataToSave = {
                id: pageData?.id,
                page_url: pageData?.page_url,
                page_title: pageData?.page_title,
                page_description: pageData?.page_description,
                page_status: pageData?.page_status,
                page_metadata_title: pageData?.page_metadata_title,
                page_metadata_description: pageData?.page_metadata_description,
                page_content: pageData?.page_content,
                created_at: pageData?.created_at,
                updated_at: now
            };

            const { projects } = await params;
            const response = await FetchProjectDetail(projects);

            if (!response.ok || !response.data) {
                throw new Error("Project not found");
            }

            const externalData = await fetch(
                `${process.env.NEXT_PUBLIC_LOCAL_BASE_API_URL || response.data.project_base_api_url}/external/page/update-page`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        EXTERNAL_API_SECRET: "test123",
                    },
                    body: JSON.stringify({ 
                        page: pageDataToSave,
                        EXTERNAL_API_SECRET: "test123" 
                    }),
                }
            );
            const externalResponse = await externalData.json();
            if (externalResponse.status === 200) {
                // Update local state with new timestamp
                setPageData(prev => prev ? { ...prev, updated_at: now } : null);
                toast({
                    title: "Success...",
                    description: "Page Settings Updated."
                });
            }
        } catch (error) {
            console.error('Error saving page:', error);
            toast({
                title: "Error",
                description: "Failed to save page settings.",
                variant: "destructive"
            });
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="w-full h-96 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm text-gray-500">Loading page...</p>
                </div>
            </div>
        );
    }

    if (!pageData) {
        return (
            <div className="p-10 text-center text-gray-500">
                Page Not Found
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Editing Page</h1>
                        <p className="text-sm text-gray-500">
                            Last modified: {moment(pageData?.updated_at).fromNow()}
                        </p>
                    </div>
                    <Button
                        onClick={handleSave}
                        disabled={isSaving}
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </Button>
                </div>

                <div className="space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Page URL</label>
                                    <Input
                                        value={pageData.page_url || ''}
                                        onChange={(e) => handleInputChange('page_url', e.target.value)}
                                        placeholder="Enter page URL"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Page Title</label>
                                    <Input
                                        value={pageData.page_title || ''}
                                        onChange={(e) => handleInputChange('page_title', e.target.value)}
                                        placeholder="Enter page title"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Description and Status */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="space-y-6">
                                <div>
                                    <label className="text-sm font-medium">Page Description</label>
                                    <Textarea
                                        value={pageData.page_description || ''}
                                        onChange={(e) => handleInputChange('page_description', e.target.value)}
                                        placeholder="Enter page description"
                                        className="mt-2"
                                    />
                                </div>
                                <div className="w-64">
                                    <label className="text-sm font-medium">Status</label>
                                    <Select
                                        value={pageData.page_status || 'draft'}
                                        onValueChange={(value) => handleInputChange('page_status', value)}
                                    >
                                        <SelectTrigger className="mt-2">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="published">Published</SelectItem>
                                            <SelectItem value="archived">Archived</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* SEO Metadata */}
                    <Card>
                        <CardContent className="pt-6">
                            <h2 className="text-lg font-semibold mb-4">SEO Metadata</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Meta Title</label>
                                    <Input
                                        value={pageData.page_metadata_title || ''}
                                        onChange={(e) => handleInputChange('page_metadata_title', e.target.value)}
                                        placeholder="Enter meta title"
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Meta Description</label>
                                    <Textarea
                                        value={pageData.page_metadata_description || ''}
                                        onChange={(e) => handleInputChange('page_metadata_description', e.target.value)}
                                        placeholder="Enter meta description"
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Page Content Editor */}
                    <Card>
                        <CardContent className="pt-6">
                            <h2 className="text-lg font-semibold mb-4">Page Content</h2>
                            <DndProvider backend={HTML5Backend}>
                                <PageEditor
                                    content={pageData.page_content || null}
                                    onChange={(content: any) => handleInputChange('page_content', content)}
                                />
                            </DndProvider>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}