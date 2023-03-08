import React from "react";
import styled from "styled-components/macro";
import { RoleObject, ToneOfVoice } from "./types";

export const ARDOQ_SENIOR_FE: RoleObject = {
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
      "Built a thing with some other people. Talked to non-devs, clicked things in Jira, and coded.",
      "Fixed some old founder code that was functional for longer than the technology it was written in.",
      "Helped users find browser dev tools.",
    ],
  },
  skills: ["TypeScript", "RxJS", "React", "Backbone", "styled-components"],
};

export const ARDOQ_TEAM_LEAD: RoleObject = {
  title: "Engineering Team Lead",
  start: "May 2019",
  end: "Sep 2021",
  locationStr: "Norway",
  summary: {
    Professional: [
      "Managed a team of 3 engineers & 1 UX designer until relocating to Seattle.",
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
  skills: ["TypeScript", "RxJS", "React", "styled-components"],
};

export const ARDOQ_FE_ENGINEER: RoleObject = {
  title: "Software Engineer",
  start: "Aug 2018",
  end: "Jul 2020",
  locationStr: "Norway",
  summary: {
    Professional: [
      "Designed & created data pipeline, integrating metrics from our website, marketing channels, and product. Collaborated with department heads to identify high-priority metrics.",
      "Organized & led quarterly hackathons.",
    ],
    Absurd: [
      "Made shiny charts that people pointed at in meetings.",
      "Harassed devs to contribute hackathon project ideas and handed out a miniature trophy.",
    ],
  },
  skills: [
    "PostgreSQL",
    "Cube.dev",
    "TypeScript",
    "RxJS",
    "React",
    "styled-components",
  ],
};

export const ARDOQ_HEAD_MARKETING: RoleObject = {
  title: "Head of Digital Marketing",
  start: "Apr 2016",
  end: "Aug 2018",
  locationStr: "Norway",
  summary: {
    Professional: [
      "Joined as #9, and have remained through our growth to over 200 employees with offices in 4 countries.",
      "Created landing pages & promoted numerous use cases, then helped focus our product-market fit.",
      "Built and maintained website, ran our SEO, SEM, and other digital marketing channels.",
    ],
    Absurd: [
      "Outgrew office space 6 times.",
      "Attempted to make a B2B SaaS tool sound exciting in 140 characters or less.",
      "Got paid to be on social media.",
    ],
  },
};

export const SLOAT_MARKETING: RoleObject = {
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
};

export const ATLASSIAN_OMM: RoleObject = {
  title: "Online Marketing Manager",
  start: "Jun 2011",
  end: "Aug 2015",
  locationStr: "San Francisco & Amsterdam",
  summary: {
    Professional:
      "Oversaw digital advertising budget, campaigns, & analysis. Helped design a metrics pipeline and attribution model for calculating ROI throughout marketing funnel. Performed A/B testing on ad copy and website content.",
    Absurd:
      "Got taken out to dinner by ad vendors, looked at charts, made charts, presented charts.",
  },
};

export const ATLASSIAN_PMS: RoleObject = {
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
};

export const EDUCATION: RoleObject = {
  title: "Claremont McKenna College",
  start: "2005",
  end: "2009",
  locationStr: "Claremont, California",
  summary: {
    Professional: "Bachelor of Arts, Computer Science",
    Absurd: "Schmachelor of Arts, Compooter Science",
  },
};

const PersonalProjectWrapper = styled.div`
  p:first-child {
    margin-top: 0;
  }
`;

const ScriptableUtilsRoleSummary = ({
  toneOfVoice,
}: {
  toneOfVoice: ToneOfVoice;
}) => {
  const description =
    toneOfVoice === "Professional"
      ? `TypeScript development flow for more robust development on the iOS app
  Scriptable, with suite of API wrappers and interactive, stateful UX
  elements and utils.`
      : "Wrapped iOS wrappers in wrappers for wrapped-up wrappers, in TypeScript.";
  return (
    <PersonalProjectWrapper>
      <p>{description}</p>
      <p>
        Documented at{" "}
        <a href="/#/scriptable-utils">sloat.life/#/scriptable-utils</a>
      </p>
    </PersonalProjectWrapper>
  );
};

export const PERSONAL_PROJECTS: RoleObject = {
  title: "scriptable-utils",
  titleHref: "/#/scriptable-utils",
  summary: {
    Absurd: <ScriptableUtilsRoleSummary toneOfVoice="Absurd" />,
    Professional: <ScriptableUtilsRoleSummary toneOfVoice="Professional" />,
  },
};
