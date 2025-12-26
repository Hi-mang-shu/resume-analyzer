type Props = {
  matchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
};

const MatchResult = ({
  matchPercentage,
  matchedSkills,
  missingSkills,
}: Props) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">
        Match Score: {matchPercentage}%
      </h2>
      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
        <div
          className="bg-blue-600 h-3 rounded-full"
          style={{ width: `${matchPercentage}%` }}
        />
      </div>

      <div className="mb-3">
        <h3 className="font-semibold text-green-600">Matched Skills</h3>

        {matchedSkills.length === 0 ? (
          <p className="text-sm text-gray-500">
            No matched skills found.
          </p>
        ) : (
          <ul className="list-disc list-inside">
            {matchedSkills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="font-semibold text-red-600">Missing Skills</h3>

        {missingSkills.length === 0 ? (
          <p className="text-sm text-green-600">
            Great! No missing skills 🎉
          </p>
        ) : (
          <ul className="list-disc list-inside">
            {missingSkills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MatchResult;
