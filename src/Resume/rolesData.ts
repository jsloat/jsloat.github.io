import { ResumeState, RoleObject, SectionHeaderObject } from "./types";

type RolesData = {
  sectionHeader: SectionHeaderObject;
  roles: RoleObject[];
}[];

const getRolesData = ({ targetRole }: ResumeState): RolesData => {
  const currentRole: RoleObject = {
    title: "Senior Software Engineer",
    start: "Jul 2020",
    end: "Present",
    locationStr: "Norway & Seattle",
    summary: {
      Professional: [
        "End-to-end managed a project to introduce a user onboarding tool into our app. Clarified objectives with stakeholders in Sales, maintained task backlog, implemented, and iterated with customer teams.",
        "Refactored & redesigned Backbone views in React. One of this project's goals was to remove a jQuery dependency that posed a security risk.",
        "Worked with customers to identify and fix performance issues in the app. In one case, reduced load time for a specific user from several minutes to a few seconds.",
      ],
      Absurd: [
        "Built a thing with some other people. Talked to non-devs, clicked things in Jira, coded, and coded more.",
        "Fixed some old founder code that was functional for longer than the technology it was written in.",
        "Helped users find browser dev tools.",
      ],
    },
    skills: ["TypeScript", "RxJS", "React", "Backbone"],
  };

  const teamLeadRole: RoleObject = {
    title: "Engineering Team Lead",
    start: "May 2019",
    end: "Sep 2021",
    locationStr: "Norway",
    summary: {
      Professional: [
        "Managed a team of 3 engineers until relocating to Seattle.",
        "Led quarterly KPI review sessions within my team to design our key results, mapped to top-level company objectives.",
        "Implemented the WSFJ prioritization model engineering-wide, used to categorize & prioritize user stories & bugs.",
        "Oversaw Summer dev internship program; defined the project, managed the backlog, and provided mentorship to 3 interns.",
      ],
      Absurd: [
        "Adjusted project deadlines and organized slightly depressing Zoom social events during COVID.",
        "Hosted Miro sessions where we drew boxes and tried to connect them to other boxes.",
        "Attempted to add even more red-tape and required fields to Jira.",
        "Strove to convince interns that the project they worked on was exciting, while simultaneously teaching them JavaScript.",
      ],
    },
    skills: ["TypeScript", "RxJS", "React"],
  };

  return [
    {
      sectionHeader: { text: "Ardoq", href: "https://www.ardoq.com/" },
      roles: [
        ...(targetRole === "Individual contributor"
          ? [currentRole, teamLeadRole]
          : [teamLeadRole, currentRole]),
        {
          title: "Software Engineer",
          start: "Aug 2018",
          end: "Jul 2020",
          locationStr: "Norway",
          summary: {
            Professional: [
              "Designed & created data pipeline, integrating metrics from our website, marketing channels, and product. Interviewed department heads to identify high-priority metrics.",
              "Organized & led quarterly hackathons.",
            ],
            Absurd: [
              "Made shiny charts that people pointed at in meetings.",
              "Harassed devs to contribute hackathon project ideas and handed out a miniature trophy.",
            ],
          },
          skills: ["PostgreSQL", "Cube.dev", "TypeScript", "RxJS", "React"],
        },
        {
          title: "Head of Digital Marketing",
          start: "Apr 2016",
          end: "Aug 2018",
          locationStr: "Norway",
          summary: {
            Professional: [
              "Migrated website from WordPress to HubSpot.",
              "Built and maintained website, ran our SEO, SEM, and other digital marketing channels.",
            ],
            Absurd: [
              "Copied old, terrible PHP website code into an equally terrible new tool.",
              "Attempted to make a B2B SaaS tool sound exciting in 140 characters or less.",
            ],
          },
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
          summary: {
            Professional:
              "Delivered freelance marketing services to startups in Oslo, including strategy & measurement recommendations, & online marketing campaign implementation.",
            Absurd:
              "Started a business in a foreign language, then abused family connections to take money from startups in exchange for managing their Adwords accounts.",
          },
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
          summary: {
            Professional:
              "Oversaw digital advertising budget, campaigns, & analysis. Helped design a metrics pipeline and attribution model for calculating ROI throughout the marketing funnel.",
            Absurd:
              "Got taken out to dinner by ad vendors, looked at charts, made charts, presented charts.",
          },
        },
        {
          title: "Product Marketing Specialist",
          start: "Jul 2009",
          end: "Jun 2011",
          locationStr: "San Francisco",
          summary: {
            Professional:
              "Improved the evaluation experience for new Jira users. Managed drip-feed email campaigns, created video and written documentation, and monitored user metrics to identify areas for improvement.",
            Absurd:
              "Made low-budget tutorial videos, distributed spam, and looked at charts.",
          },
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
          summary: { Professional: [], Absurd: [] },
        },
      ],
    },
  ];
};

export default getRolesData;
