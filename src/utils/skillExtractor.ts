const SKILLS = [
  "javascript",
  "typescript",
  "react",
  "node",
  "node.js",
  "express",
  "mongodb",
  "sql",
  "html",
  "css",
  "tailwind",
  "java",
  "python",
  "c++",
  "git",
  "github",
  "api",
  "rest",
];

export const extractSkills = (text: string): string[] => {
  const normalizedText = text.toLowerCase();

  const foundSkills = SKILLS.filter((skill) =>
    normalizedText.includes(skill)
  );

  // remove duplicates
  return Array.from(new Set(foundSkills));
};
