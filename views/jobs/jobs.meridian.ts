import { BindingItemType, DataBindingType, ODI } from "@meridian-ui/meridian";

export const jobsBinding: BindingItemType = {
  itemId: ".id",
  pathToItems: ".jobs",
  attributes: [
    // Basic job information
    { value: ".title", roles: ["title"] },
    { value: ".company", roles: ["subtitle", "company"] },
    { value: ".companyLogo", type: "image", roles: ["thumbnail", "logo"] },

    // Location information
    {
      label: "Location",
      value: ".location.city",
      roles: ["location", "city"]
    },
    {
      value: ".location.state",
      roles: ["location", "state"]
    },
    {
      value: ".location.remote",
      roles: ["badge", "remote-type"]
    },

    // Map coordinates
    {
      value: ".location.latitude",
      roles: ["latitude"]
    },
    {
      value: ".location.longitude",
      roles: ["longitude"]
    },

    // Salary information
    {
      label: "Salary Range",
      value: ".salary",
      type: "salary-range",
      roles: ["salary", "compensation"]
    },

    // Job metadata
    { value: ".type", roles: ["badge", "job-type"] },
    { value: ".level", roles: ["badge", "experience-level"] },
    { value: ".department", roles: ["department"] },
    { value: ".postedDate", type: "date", roles: ["posted-date"] },

    // Job description
    { value: ".description", roles: ["description", "summary"] },

    // Requirements
    {
      label: "Requirements",
      value: ".requirements",
      transform: [{ map: "." }],
      roles: ["requirements", "list"]
    },

    // Responsibilities
    {
      label: "Responsibilities",
      value: ".responsibilities",
      transform: [{ map: "." }],
      roles: ["responsibilities", "list"]
    },

    // Benefits
    {
      label: "Benefits",
      value: ".benefits",
      transform: [{ map: "." }],
      roles: ["benefits", "list"]
    },

    // Skills
    {
      label: "Skills",
      value: ".skills",
      transform: [{ map: "." }],
      roles: ["skills", "tags"]
    },

    // Applicants count
    {
      label: "Applicants",
      value: ".applicants",
      roles: ["applicants", "metric"]
    }
  ],
};

const dataBinding: DataBindingType[] = [
  { id: "jobs", binding: jobsBinding }
];

export const jobsODI: ODI = {
  dataBinding: dataBinding,
  overviews: [
    {
      id: "jobs-overview",
      type: "grid",
      bindingId: "jobs",
      itemViewType: "job-card",
      shownAttributes: [
        "title",
        "company",
        "location",
        "salary",
        "remote-type",
        "job-type"
      ],
      hiddenAttributes: [],
      layout: {
        columns: 3,
        gap: 20,
        padding: 20
      }
    }
  ],
  details: [
    {
      type: "job-detail",
      visibleAttributes: [
        "title",
        "company",
        "logo",
        "location",
        "salary",
        "remote-type",
        "job-type",
        "experience-level",
        "department",
        "posted-date",
        "description",
        "requirements",
        "responsibilities",
        "benefits",
        "skills",
        "applicants"
      ],
      hiddenAttributes: []
    }
  ]
};
