"use client"
import React, { useState, useEffect } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FetchProjectDetail } from "@/utils/Project.util";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { useRouter } from 'next/navigation';
import moment from "moment";

interface ContentConfig {
  type: string;
  name: string;
  config: any;
}

interface PageSchema {
  id: string;
  page_url: string;
  page_title: string;
  page_description: string;
  page_status: "draft" | "published" | "archived";
  page_metadata_title: string;
  page_metadata_description: string;
  page_content: ContentConfig[];
  created_at: number;
}

interface PagesTableProps {
  params: Promise<{ projects: string }>;
}

const PageSchema = z.object({
  page_url: z.string().nonempty("Page URL is required."),
  page_title: z.string().nonempty("Page title is required."),
  page_description: z.string().min(5, "Description must be at least 5 characters long."),
  page_status: z.enum(["draft", "published", "archived"]),
  page_metadata_title: z.string().nonempty("Meta title is required."),
  page_metadata_description: z.string().min(5, "Meta description must be at least 5 characters long."),
  page_content: z.array(z.object({
    type: z.string(),
    name: z.string(),
    config: z.any()
  })).default([])
});

const PagesTable: React.FC<PagesTableProps> = ({ params }) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    page_url: "",
    page_title: "",
    page_description: "",
    page_status: "draft" as const,
    page_metadata_title: "",
    page_metadata_description: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pages, setPages] = useState<PageSchema[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPages = async () => {
      setIsLoading(true);
      try {
        const { projects } = await params;
        const response = await FetchProjectDetail(projects);
        if (!response.ok || !response.data) {
          throw new Error('Project not found');
        }

        const externalData = await fetch(
          `${process.env.NEXT_PUBLIC_LOCAL_BASE_API_URL || response.data.project_base_api_url}/external/page/get-pages`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'EXTERNAL_API_SECRET': "test123"
            },
          }
        );
        const body = await externalData.json();
        setPages(body.page.data || []);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load pages');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPages();
  }, [params]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      PageSchema.parse(formData);
      setValidationError(null);
      setIsSubmitting(true);

      const { projects } = await params;
      const response = await FetchProjectDetail(projects);
      if (!response.ok || !response.data) {
        throw new Error("Project not found");
      }

      const externalData = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_BASE_API_URL || response.data.project_base_api_url}/external/page/insert-page`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            EXTERNAL_API_SECRET: "test123",
          },
          body: JSON.stringify({
            pageData: JSON.stringify({ ...formData }),
            EXTERNAL_API_SECRET: "test123",
          })
        }
      );
      const responseData = await externalData.json();
      if (!externalData.ok) {
        throw new Error(responseData.message || "Failed to create page");
      }

      if (responseData.page) {
        setPages([...pages, responseData.page]);
      }
      setFormData({
        page_url: "",
        page_title: "",
        page_description: "",
        page_status: "draft",
        page_metadata_title: "",
        page_metadata_description: "",
      });
      setIsAddDialogOpen(false);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        setValidationError(err.errors[0].message);
      } else {
        setError(err.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-gray-500">Connecting to the Project's Database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="p-6 border-none">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Pages</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your website pages</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Page
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page URL</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No pages available
                  </TableCell>
                </TableRow>
              ) : (
                pages.map((page) => (
                  <TableRow
                    key={page.id}
                    className="hover:bg-muted/50 transition-colors hover:cursor-pointer"
                    onClick={() => { router.push(`pages/${page.id}`) }}
                  >
                    <TableCell className="font-medium">{page.page_url}</TableCell>
                    <TableCell>{page.page_title}</TableCell>
                    <TableCell>{page.page_status}</TableCell>
                    <TableCell>{moment(page.created_at).fromNow()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <AlertDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Add New Page</AlertDialogTitle>
              <AlertDialogDescription>
                Create a new page for your website. Content can be added after creation.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="page_url">Page URL</Label>
                <Input
                  id="page_url"
                  placeholder="Enter page URL"
                  value={formData.page_url}
                  onChange={(e) => handleInputChange("page_url", e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="page_title">Page Title</Label>
                <Input
                  id="page_title"
                  placeholder="Enter page title"
                  value={formData.page_title}
                  onChange={(e) => handleInputChange("page_title", e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="page_description">Page Description</Label>
                <Textarea
                  id="page_description"
                  placeholder="Enter page description"
                  value={formData.page_description}
                  onChange={(e) => handleInputChange("page_description", e.target.value)}
                  className="min-h-20"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="page_status">Status</Label>
                <Select
                  value={formData.page_status}
                  onValueChange={(value: "draft" | "published" | "archived") =>
                    handleInputChange("page_status", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="page_metadata_title">Meta Title</Label>
                <Input
                  id="page_metadata_title"
                  placeholder="Enter meta title"
                  value={formData.page_metadata_title}
                  onChange={(e) => handleInputChange("page_metadata_title", e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="page_metadata_description">Meta Description</Label>
                <Textarea
                  id="page_metadata_description"
                  placeholder="Enter meta description"
                  value={formData.page_metadata_description}
                  onChange={(e) => handleInputChange("page_metadata_description", e.target.value)}
                  className="min-h-20"
                />
              </div>
            </div>

            {validationError && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{validationError}</AlertDescription>
              </Alert>
            )}

            <AlertDialogFooter>
              <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="gap-2"
              >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Create Page
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default PagesTable;