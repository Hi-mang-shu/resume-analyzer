type Props = {
  onFileSelect: (file: File | null) => void;
};

const ResumeUpload = ({ onFileSelect }: Props) => {
  return (
    <div className="border-2 border-dashed border-blue-300 rounded-xl p-6 text-center bg-blue-50">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        Upload Resume
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        PDF format only
      </p>

      <label className="inline-block cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
        Choose File
        <input
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => onFileSelect(e.target.files?.[0] || null)}
        />
      </label>
    </div>
  );
};

export default ResumeUpload;
