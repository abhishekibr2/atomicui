"use client"
import ProjectCard from "@/components/projects/ProjectCard";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ProjectSchema } from "@/schema/project";
import { FetchProjects } from "@/utils/Project.util";
import { useEffect, useState } from "react";

export default function ProtectedPage() {
  const [projects, setProjects] = useState<ProjectSchema[]>([]);

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <ProjectCard />
      </div>
    </div>
  );
}
