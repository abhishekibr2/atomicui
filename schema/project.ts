export interface ProjectSchema {
    id?: number;
    project_name: string;
    project_description: string;
    project_external_api_secret: string;
    project_base_api_url: string;
    created_at?: string;
}
