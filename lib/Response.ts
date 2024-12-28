export interface AddPorjectResponse {
    data: {
        id: number;
        project_name: string;
        project_description: string;
        project_base_api_url: string;
        project_external_api_secret: string;
    } | null;
    ok: boolean;
}

export interface GetAllProjectResponse {
    data: {
        id: number;
        project_name: string;
        project_description: string;
        project_base_api_url: string;
        project_external_api_secret: string;
    }[] | null;
    ok: boolean;
}

export interface GetProjectDetailResponse {
    data: {
        id: number;
        project_name: string;
        project_description: string;
        project_base_api_url: string;
        project_external_api_secret: string;
    } | null;
    ok: boolean;
}