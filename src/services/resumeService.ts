export const analyzeResume = async (
  file: File,
  jobDescription: string
) => {
  const base64 = await fileToBase64(file);

    const response = await fetch("/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      resumeBase64: base64,
      jobDescription,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "API error");
  }

  return response.json();

};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
  });
};
