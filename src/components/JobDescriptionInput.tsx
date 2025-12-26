type Props = {
  value: string;
  onChange: (text: string) => void;
};

const JobDescriptionInput = ({ value, onChange }: Props) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Job Description</h2>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        placeholder="Paste the job description here..."
        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default JobDescriptionInput;
