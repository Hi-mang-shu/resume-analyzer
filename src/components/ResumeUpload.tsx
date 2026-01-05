import { useState } from "react";

type Props = {
  onFileSelect: (file: File | null) => void;
};

const ResumeUpload = ({ onFileSelect }: Props) => {
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (file: File | null) => {
    if (!file) return;

    setUploading(true);
    setFileName(null);

    // Simulate processing delay (UX purpose)
    setTimeout(() => {
      setUploading(false);
      setFileName(file.name);
      onFileSelect(file);
    }, 800);
  };

  return (
    <div className="border-2 border-dashed rounded-xl p-6 text-center bg-blue-50 border-blue-300">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        Upload Resume
      </h2>

      {!uploading && !fileName && (
        <>
          <p className="text-sm text-gray-500 mb-4">
            PDF format only
          </p>

          <label className="inline-block cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            Choose File
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) =>
                handleFileChange(e.target.files?.[0] || null)
              }
            />
          </label>
        </>
      )}

      {uploading && (
        <div className="flex flex-col items-center space-y-2">
          <div className="animate-spin h-6 w-6 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          <p className="text-blue-600 font-medium">
            Uploading resume…
          </p>
        </div>
      )}

      {fileName && !uploading && (
        <div className="space-y-2">
          <p className="text-green-600 font-semibold">
            Resume uploaded successfully ✅
          </p>
          <p className="text-sm text-gray-600 truncate">
            {fileName}
          </p>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
