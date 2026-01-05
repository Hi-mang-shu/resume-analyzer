const pdfParse = require("pdf-parse");

export default async function handler(req: any, res: any) {
  console.log("API HIT");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { resumeBase64, jobDescription } = req.body;

    console.log("Body received");

    if (!resumeBase64 || !jobDescription) {
      console.log("Missing data");
      return res.status(400).json({ message: "Missing data" });
    }

    const buffer = Buffer.from(resumeBase64, "base64");
    console.log("Buffer size:", buffer.length);

    const data = await pdfParse(buffer);
    console.log("PDF parsed");

    return res.status(200).json({ text: data.text });
  } catch (error) {
    console.error("Backend error:", error);
    return res.status(500).json({ message: "Failed to analyze resume" });
  }
}
