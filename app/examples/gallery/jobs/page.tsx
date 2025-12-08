"use client";

import { jobsODI } from "@/views/jobs/jobs.meridian";
import { MeridianWrapper, MeridianOverview } from "@meridian-ui/meridian";
import jobsData from "@/views/jobs/jobs-data.json";
import { jobsConfig } from "@/views/jobs/jobs-config";

export default function JobBoard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="mb-8 px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Your Next Opportunity</h1>
          <p className="text-lg text-gray-600">
            Explore {jobsData.jobs?.length || 0} open positions from top companies
          </p>
        </div>

        {/* Meridian Job Board */}
        <MeridianWrapper data={jobsData} odi={jobsODI} {...jobsConfig}>
          <MeridianOverview />
        </MeridianWrapper>
      </div>
    </div>
  );
}
