import { AddPorjectResponse, GetAllProjectResponse, GetProjectDetailResponse } from '@/lib/Response';
import { ProjectSchema } from '@/schema/project';
import { createClient } from '@/utils/supabase/client'

export async function FetchProjects(): Promise<GetAllProjectResponse> {
    const supabase = createClient();
    const { data, error } = await supabase.from('Projects').select('*');
    if (error) {
        return { data: null, ok: false };
    }
    return { data: data, ok: true };
}

export async function CreateProject(formData: ProjectSchema): Promise<AddPorjectResponse> {
    const supabase = createClient();
    const { data, error } = await supabase.from('Projects').insert(formData);
    if (error) {
        return { data: null, ok: false };
    }
    return { data: data, ok: true };
}

export async function FetchProjectDetail(id: string): Promise<GetProjectDetailResponse> {
    const supabase = createClient();
    const { data, error } = await supabase.from('Projects').select('*').eq('id', id).maybeSingle();
    if (error) {
        console.log(error);
        return { data: null, ok: false };
    }
    return { data: data, ok: true };
}