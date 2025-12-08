import { AttributeSalaryRange } from "@/views/jobs/attribute-salary-range";
import { DetailViewJob } from "@/views/jobs/detail-view-job";
import { ItemViewJob } from "@/views/jobs/item-view-job";

export const jobsConfig = {
  customItemViewTypes: [{ type: "job-card", view: ItemViewJob }],
  customAttributeTypes: [
    { type: "salary-range", view: AttributeSalaryRange },
  ],
  customDetailViewTypes: [{ type: "job-detail", view: DetailViewJob, defaultSpec: {} }],
  onOpenDetailNewPage: (item: any) => {
    window.location.href = `/examples/gallery/jobs/${item?.id}`;
  },
  onOpenOverviewNewPage: () => {
    window.location.href = "/examples/gallery/jobs";
  },
};
