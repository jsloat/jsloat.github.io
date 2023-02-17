import { RoleObject, SectionHeaderObject } from "./types";

type RolesData = {
  sectionHeader: SectionHeaderObject;
  roles: RoleObject[];
}[];

const rolesData: RolesData = [
  {
    sectionHeader: { text: "Ardoq", href: "https://www.ardoq.com/" },
    roles: [
      {
        title: "Senior Software Engineer",
        start: "Jul 2020",
        end: "Present",
        locationStr: "Norway & Seattle",
        summary: [
          "Refactored & redesigned Backbone views in React",
          "Built our in-app user onboarding tool",
          "Worked with customers to identify and fix performance issues in the app",
        ],
        skills: ["TypeScript", "RxJS", "React", "Backbone"],
      },
      {
        title: "Engineering Team Lead",
        start: "May 2019",
        end: "Sep 2021",
        locationStr: "Norway",
        summary: [
          "Managed a team of 3 engineers until relocating to Seattle",
          "Implemented the WSFJ prioritization model engineering-wide, used to categorize & prioritize user stories & bugs",
        ],
        skills: ["TypeScript", "RxJS", "React"],
      },
      {
        title: "Software Engineer",
        start: "Aug 2018",
        end: "Jul 2020",
        locationStr: "Norway",
        summary: [
          "Designed & created data pipeline, integrating metrics from our website, marketing channels, and product",
          "Organized & led quarterly hackathons",
        ],
        skills: [
          "Redshift",
          "PostgreSQL",
          "Cube.dev",
          "TypeScript",
          "RxJS",
          "React",
        ],
      },
    ],
  },

  {
    sectionHeader: { text: "Sloat Marketing" },
    roles: [
      {
        title: "Owner",
        start: "Nov 2015",
        end: "Apr 2016",
        locationStr: "Norway",
        summary:
          "Delivered freelance marketing services to startups in Oslo, including strategy & measurement recommendations, & online marketing campaign implementation",
      },
    ],
  },

  {
    sectionHeader: { text: "Atlassian", href: "https://www.atlassian.com/" },
    roles: [
      {
        title: "Online Marketing Manager",
        start: "Jun 2011",
        end: "Aug 2015",
        locationStr: "San Francisco & Amsterdam",
        summary: [
          "Oversaw digital advertising budget, campaigns, & analysis",
          "Worked with data science team to develop an attribution model for calculating ROI throughout the marketing funnel",
        ],
      },
      {
        title: "Product Marketing Specialist",
        start: "Jul 2009",
        end: "Jun 2011",
        locationStr: "San Francisco",
        summary: "Did marketing stuff for marketing people",
      },
    ],
  },

  {
    sectionHeader: { text: "Claremont McKenna College" },
    roles: [
      {
        title: "Bachelor of Arts, Computer Science",
        start: "2005",
        end: "2009",
        locationStr: "Claremont, California",
        summary: [],
      },
    ],
  },
];

export default rolesData;
