export interface VendorSkillMeta {
  official?: boolean;
  source: string;
  skills: Record<string, string>; // sourceSkillName -> outputSkillName
}

/**
 * Repositories to clone as submodules and generate skills from source
 */
export const submodules = {
  vite: "https://github.com/vitejs/vite",
  vitest: "https://github.com/vitest-dev/vitest",
  tailwind: "https://github.com/tailwindlabs/tailwindcss.com",
};

/**
 * Already generated skills, sync with their `skills/` directory
 */
export const vendors: Record<string, VendorSkillMeta> = {
  turborepo: {
    official: true,
    source: "https://github.com/vercel/turborepo",
    skills: {
      turborepo: "turborepo",
    },
  },
  "vercel-labs": {
    source: "https://github.com/vercel-labs/agent-skills",
    skills: {
      "web-design-guidelines": "web-design-guidelines",
      "react-best-practices": "react-best-practices",
    },
  },
  gsap: {
    source: "https://github.com/greensock/gsap-skills",
    skills: {
      "gsap-core": "gsap-core",
      "gsap-timeline": "gsap-timeline",
      "gsap-performance": "gsap-performance",
      "gsap-scrolltrigger": "gsap-scrolltrigger",
    },
  },
};

/**
 * Hand-written skills with Anthony Fu's preferences/tastes/recommendations
 */
export const manual = ["kirdes", "pixi-js", "typescript", "vertical-codebase"];
