import React from "react";
import styled from "styled-components/macro";
import { RoleObject, ToneOfVoice } from "./types";

export const TRUVETA_SENIOR_FE: RoleObject = {
  title: "Senior Software Engineer",
  start: "May 2023",
  locationStr: "Seattle",
  summary: {
    Professional: [
      {
        content:
          "Implemented & customized open-source DICOM viewer for customers to preview medical images.",
      },
      {
        content:
          "Refactored parsing algorithm that handles thousands of entries; decreased time complexity & improved readability.",
      },
      {
        content:
          "Delivered new features for our internal tool from planning through release.",
      },
      {
        content:
          "Mentored junior peers, organized engineering book club, drove process & tools documentation.",
      },
    ],
    Absurd: [
      {
        content: "Added bones viewer to app.",
      },
      {
        content: "Console logged a lot.",
      },
      {
        content: "Helped coworkers click more buttons more better.",
      },
      {
        content: "Learned gen Z slang.",
      },
    ],
  },
  skills: ["TypeScript", "React", "GraphQL", "C#", "MUI"],
};

export const ARDOQ_SENIOR_FE: RoleObject = {
  title: "Senior Software Engineer",
  start: "Jul 2020",
  end: "May 2023",
  locationStr: "Norway & Seattle",
  summary: {
    Professional: [
      {
        content:
          "End-to-end managed a project to introduce a user onboarding tool into our app. Clarified objectives with stakeholders in Sales, maintained task backlog, implemented, and iterated with customer teams.",
      },
      {
        content:
          "Refactored & redesigned Backbone views in React. One of this project's goals was to remove a jQuery dependency that posed a security risk.",
      },
      {
        content:
          "Worked with customers to identify and fix performance issues in the app. In one case, reduced load time for a specific user from several minutes to a few seconds.",
      },
    ],
    Absurd: [
      {
        content:
          "Built a thing with some other people. Talked to non-devs, clicked things in Jira, and coded.",
      },
      {
        content:
          "Fixed some old founder code that was functional for longer than the technology it was written in.",
      },
      { content: "Helped users find browser dev tools." },
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
      {
        content:
          "Managed a team of 3 engineers & 1 UX designer until relocating to Seattle.",
      },
      {
        content:
          "Led quarterly KPI review sessions within my team to design our key results, mapped to top-level company objectives.",
      },
      {
        content:
          "Implemented the WSFJ prioritization model engineering-wide, used to categorize & prioritize user stories & bugs.",
        hideWhenPrinting: true,
      },
      {
        content:
          "Oversaw Summer dev internship program; defined the project, managed the backlog, and provided mentorship to 3 interns.",
        hideWhenPrinting: true,
      },
    ],
    Absurd: [
      {
        content:
          "Adjusted project deadlines and organized slightly depressing Zoom social events during COVID.",
      },
      {
        content:
          "Hosted Miro sessions where we drew boxes and tried to connect them to other boxes.",
      },
      {
        content:
          "Attempted to add even more red-tape and required fields to Jira.",
      },
      {
        content:
          "Strove to convince interns that the project they worked on was exciting, while simultaneously teaching them JavaScript.",
      },
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
      {
        content:
          "Designed & created data pipeline, integrating metrics from our website, marketing channels, and product. Collaborated with department heads to identify high-priority metrics.",
      },
    ],
    Absurd: [
      { content: "Made shiny charts that people pointed at in meetings." },
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
      {
        content:
          "Built and maintained website, ran our SEO, SEM, and other digital marketing channels and performance analysis.",
      },
    ],
    Absurd: [{ content: "Got paid to be on social media." }],
  },
};

export const SLOAT_MARKETING: RoleObject = {
  title: "Owner",
  start: "Nov 2015",
  end: "Apr 2016",
  locationStr: "Norway",
  summary: {
    Professional: [
      {
        content:
          "Delivered freelance marketing services to startups in Oslo, including strategy & measurement recommendations, & online marketing campaign implementation.",
      },
    ],
    Absurd: [
      {
        content:
          "Started a business in a foreign language, then abused family connections to take money from startups in exchange for managing their Adwords accounts.",
      },
    ],
  },
};

export const ATLASSIAN_OMM: RoleObject = {
  title: "Online Marketing Manager",
  start: "Jun 2011",
  end: "Aug 2015",
  locationStr: "San Francisco & Amsterdam",
  summary: {
    Professional: [
      {
        content:
          "Oversaw digital advertising budget, campaigns, & analysis. Helped design a metrics pipeline and attribution model for calculating ROI throughout marketing funnel. Performed A/B testing on ad copy and website content.",
        hideWhenPrinting: true,
      },
    ],
    Absurd: [
      {
        content:
          "Got taken out to dinner by ad vendors, looked at charts, made charts, presented charts.",
        hideWhenPrinting: true,
      },
    ],
  },
};

export const ATLASSIAN_PMS: RoleObject = {
  title: "Product Marketing Specialist",
  start: "Jul 2009",
  end: "Jun 2011",
  locationStr: "San Francisco",
  summary: {
    Professional: [
      {
        content:
          "Improved the evaluation experience for new Jira users. Managed drip-feed email campaigns, created video and written documentation, and monitored user metrics to identify areas for improvement.",
        hideWhenPrinting: true,
      },
    ],
    Absurd: [
      {
        content:
          "Made low-budget tutorial videos, distributed spam, and looked at charts.",
        hideWhenPrinting: true,
      },
    ],
  },
};

export const EDUCATION: RoleObject = {
  title: "Claremont McKenna College",
  start: "2005",
  end: "2009",
  locationStr: "Claremont, California",
  summary: {
    Professional: [{ content: "Bachelor of Arts, Computer Science" }],
    Absurd: [{ content: "Schmachelor of Arts, Compooter Science" }],
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
    Absurd: [{ content: <ScriptableUtilsRoleSummary toneOfVoice="Absurd" /> }],
    Professional: [
      {
        content: <ScriptableUtilsRoleSummary toneOfVoice="Professional" />,
      },
    ],
  },
};
