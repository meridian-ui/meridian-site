"use client";

import { r1ODI } from "@/views/d2-1/att.meridian";
import { MeridianWrapper, MeridianOverview } from "@meridian-ui/meridian";
import ATTItems from "@/views/d2-1/r1-data.json";
import { meridianConfig } from "@/views/d2-1/r1-config";

export default function R1() {
  return (
    <div>
      <MeridianWrapper data={ATTItems} odi={r1ODI} {...meridianConfig}>
        <MeridianOverview />
      </MeridianWrapper>
    </div>
  );
}
