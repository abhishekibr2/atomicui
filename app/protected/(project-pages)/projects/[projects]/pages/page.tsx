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
import { z } from "zod";
import { useRouter } from 'next/navigation';
import moment from "moment"

interface PageSchema {
  _id: string;
  pageUrl: string;
  pageDescription: string;
  createdAt: string;
}

interface PagesTableProps {
  params: Promise<{ projects: string }>;
}

const PageSchema = z.object({
  pageUrl: z
    .string()
    .nonempty("Page URL is required."),
  pageDescription: z
    .string()
    .min(5, "Description must be at least 10 characters long.")
    .nonempty("Description is required."),
});

const PagesTable: React.FC<PagesTableProps> = ({ params }) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [pageDescription, setPageDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pages, setPages] = useState<PageSchema[]>([]);
  const [data, setData] = useState<any>({});
  const [validationError, setValidationError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPages = async () => {
      setIsLoading(true);
      try {
        const { projects } = await params;
        const response = await FetchProjectDetail(projects);
        if (!response.ok) {
          throw new Error('Page not found');
        }
        if (!response.data) {
          return;
        }
        const externalData = await fetch(response.data.project_base_api_url + "/external/page", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'EXTERNAL_API_SECRET': "test123"
          },
        });
        const body = await externalData.json();
        setPages(body.page || []);
        setData(response.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load pages');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPages();
  }, [params]);

  const handleSubmit = async () => {
    setIsAddDialogOpen(true);
    try {
      PageSchema.parse({ pageUrl: url, pageDescription });


      setValidationError(null);
      setIsSubmitting(true);

      const { projects } = await params;
      const response = await FetchProjectDetail(projects);
      if (!response.ok) {
        throw new Error("Page not found");
      }
      if (!response.data) {
        return;
      }

      const externalData = await fetch(
        response.data.project_base_api_url + "/external/page",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            EXTERNAL_API_SECRET: "test123",
          },
          body: JSON.stringify({ pageUrl: url, pageDescription, EXTERNAL_API_SECRET: "test123" }),
        }
      );

      const responseData = await externalData.json();

      if (!externalData.ok) {
        throw new Error(responseData.message || "Failed to create page");
      }

      if (responseData.page) {
        setPages([...pages, responseData.page]);
      }
      setUrl("");
      setPageDescription("");
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
        <div>
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-gray-500">Loading pages...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="p-6 border-none	">
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
                <TableHead>Description</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center text-muted-foreground">
                    No pages available
                  </TableCell>
                </TableRow>
              ) : (
                pages.map((page) => (
                  <TableRow
                    key={page._id}
                    className="hover:bg-muted/50 transition-colors"
                    onClick={() => { router.push(`pages/` + page._id) }}
                  >
                    <TableCell className="font-medium">{page.pageUrl}</TableCell>
                    <TableCell>{page.pageDescription}</TableCell>
                    <TableCell>{moment(page.createdAt.toString()).fromNow().toString()}</TableCell>
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
                Add a new page to your website. All fields are required.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="url">Page URL</Label>
                <Input
                  id="url"
                  placeholder="Enter Page URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter Page Description"
                  value={pageDescription}
                  onChange={(e) => setPageDescription(e.target.value)}
                  className="min-h-32"
                  required
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
                Add Page
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default PagesTable;