"use client";

import { jobsODI } from "@/views/jobs/jobs.meridian";
import { MeridianWrapper, MeridianDetail } from "@meridian-ui/meridian";
import jobsData from "@/views/jobs/jobs-data.json";
import { jobsConfig } from "@/views/jobs/jobs-config";
import { useParams } from "next/navigation";

export default function JobDetail() {
  const params = useParams();
  const jobId = params.id as string;

  return (
    <MeridianWrapper data={jobsData} odi={jobsODI} {...jobsConfig}>
      <MeridianDetail itemId={jobId} />
    </MeridianWrapper>
  );
}
