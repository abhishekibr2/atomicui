"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { FetchProjectDetail } from "@/utils/Project.util";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PageSchema {
  _id: string;
  pageUrl: string;
  pageDescription: string;
}

export default function PagesPage({ params }: { params: Promise<{ projects: string }> }) {

  const [data, setData] = useState<any>({})
  const [error, setError] = useState<string | null>(null);
  const [pages, setPages] = useState<PageSchema[]>([]);
  const [url, setUrl] = useState("");
  const [pageDescription, setPageDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { projects } = await params;
      const response = await FetchProjectDetail(projects);
      if (!response.ok) {
        throw new Error('Page not found');
      }
      if (!response.data) {
        return;
      }
      console.log(response.data.project_base_api_url)
      const externalData = await fetch(response.data.project_base_api_url + "/external/page", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'EXTERNAL_API_SECRET': "test123"
        },
        body: JSON.stringify({ pageUrl: url, pageDescription, EXTERNAL_API_SECRET: "test123" }),
      });

      const data = await externalData.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create page");
      }

      if (data.page) {
        setPages([...pages, data.page]);
      }
      setUrl("");
      setPageDescription("");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };


  useEffect(() => {
    const FetchProjectDetails = async () => {
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
        setData(response.data)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load page');
        console.log(error instanceof Error ? error.message : 'Failed to load page');
      }
    };

    FetchProjectDetails();
  }, [params]);

  return (
    <div className="h-full">
      <div className="flex w-full justify-center min-h-full items-center align-center gap-10">
        <Card>
          <CardHeader>
            <CardTitle>Available Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page URL</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pages.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground">
                        No pages available
                      </TableCell>
                    </TableRow>
                  ) : (
                    pages.map((page) => (
                      <TableRow key={page._id}>
                        <TableCell className="font-medium">{page.pageUrl}</TableCell>
                        <TableCell>{page.pageDescription}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card >
          <CardHeader>
            <CardTitle>Add New Page</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter Page URL"
                  required
                />
              </div>
              <div className="space-y-2">
                <Textarea
                  value={pageDescription}
                  onChange={(e) => setPageDescription(e.target.value)}
                  placeholder="Enter Page Description"
                  className="min-h-32"
                  required
                />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Submitting..." : "Add Page"}
              </Button>
            </form>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}