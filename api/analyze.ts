const pdfParse = require("pdf-parse");

import { extractSkills } from "../src/utils/skillExtractor";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { resumeBase64, jobDescription } = req.body;

    if (!resumeBase64 || !jobDescription) {
      return res.status(400).json({ message: "Missing data" });
    }

    const buffer = Buffer.from(resumeBase64, "base64");
    const data = await pdfParse(buffer);

    const resumeSkills = extractSkills(data.text);
    const jobSkills = extractSkills(jobDescription);

    const matchedSkills = resumeSkills.filter((skill) =>
      jobSkills.includes(skill)
    );

    const missingSkills = jobSkills.filter(
      (skill) => !matchedSkills.includes(skill)
    );

    const matchPercentage =
      jobSkills.length === 0
        ? 0
        : Math.round((matchedSkills.length / jobSkills.length) * 100);

    return res.status(200).json({
      matchPercentage,
      matchedSkills,
      missingSkills,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Analysis failed",
    });
  }
}
