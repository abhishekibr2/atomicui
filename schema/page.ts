export interface PageSchema {
  id: string;
  page_url: string;
  page_title: string;
  page_description: string;
  page_status: "draft" | "published" | "archived";
  page_metadata_title: string;
  page_metadata_description: string;
  page_content: ContentConfig[];
  created_at: number;
  updated_at: string;
}

export interface ContentConfig {
  type: string;
  name: string;
  config: any;
}