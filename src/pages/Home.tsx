import { useState } from "react";
import ResumeUpload from "../components/ResumeUpload";
import JobDescriptionInput from "../components/JobDescriptionInput";
import MatchResult from "../components/MatchResult";
import { analyzeResume } from "../services/resumeService";
import type { AnalysisResult } from "../types/analysis";


const Home = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription.trim()) {
      setError("Please upload a resume and enter a job description.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const data = await analyzeResume(resumeFile, jobDescription);
      setResult(data);
    } catch {
      setError("Something went wrong while analyzing the resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Resu<span className="text-blue-600">-Match</span>
          </h1>
          <p className="text-gray-500">
            Smart Resume & Job Description Matching Tool
          </p>
        </div>

        {/* Resume Upload */}
        <ResumeUpload onFileSelect={setResumeFile} />

        {/* Job Description */}
        <JobDescriptionInput
          value={jobDescription}
          onChange={setJobDescription}
        />

        {/* Error */}
        {error && (
          <p className="text-red-600 text-center font-medium">
            {error}
          </p>
        )}

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={loading || !resumeFile}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {/* Result */}
        {result && <MatchResult {...result} />}
      </div>
    </div>
  );
};

export default Home;
