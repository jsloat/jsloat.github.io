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
          "Refactored & redesigned Backbone views in React. One of this project's goals was to remove a jQuery dependency that posed a security risk.",
          "End-to-end managed a project to introduce a user onboarding tool into our app. Clarified objectives with stakeholders in Sales, maintained task backlog, implemented, and iterated with customer teams.",
          "Worked with customers to identify and fix performance issues in the app.",
        ],
        skills: ["TypeScript", "RxJS", "React", "Backbone"],
      },
      {
        title: "Engineering Team Lead",
        start: "May 2019",
        end: "Sep 2021",
        locationStr: "Norway",
        summary: [
          "Managed a team of 3 engineers until relocating to Seattle.",
          "Led quarterly KPI review sessions within my team to design our key results, mapped to top-level company objectives.",
          "Implemented the WSFJ prioritization model engineering-wide, used to categorize & prioritize user stories & bugs.",
          "Oversaw Summer dev internship program; defined the project, managed the backlog, and provided mentorship to 3 interns.",
        ],
        skills: ["TypeScript", "RxJS", "React"],
      },
      {
        title: "Software Engineer",
        start: "Aug 2018",
        end: "Jul 2020",
        locationStr: "Norway",
        summary: [
          "Designed & created data pipeline, integrating metrics from our website, marketing channels, and product. Interviewed department heads to identify high-priority metrics.",
          "Organized & led quarterly hackathons.",
        ],
        skills: ["PostgreSQL", "Cube.dev", "TypeScript", "RxJS", "React"],
      },
      {
        title: "Head of Digital Marketing",
        start: "Apr 2016",
        end: "Aug 2018",
        locationStr: "Norway",
        summary: [
          "Migrated website from WordPress to HubSpot.",
          "Built and maintained website, ran our SEO, SEM, and other digital marketing channels.",
        ],
        skills: ["HubSpot", "Intercom"],
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
          "Delivered freelance marketing services to startups in Oslo, including strategy & measurement recommendations, & online marketing campaign implementation.",
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
        summary:
          "Oversaw digital advertising budget, campaigns, & analysis. Helped design a metrics pipeline and attribution model for calculating ROI throughout the marketing funnel.",
      },
      {
        title: "Product Marketing Specialist",
        start: "Jul 2009",
        end: "Jun 2011",
        locationStr: "San Francisco",
        summary:
          "Improved the evaluation experience for new Jira users. Managed drip-feed email campaigns, created video and written documentation, and monitored user metrics to identify areas for improvement.",
        skills: ["Screenflow"],
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
