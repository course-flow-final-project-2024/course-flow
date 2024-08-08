import { useEffect, useState } from "react";

const AdminEditAssignmentDetail = ({
  assignmentFromDb,
  assignmentTitle,
  setAssignmentTitle,
}) => {
  const [error, setError] = useState({});

  const AssignmentValidation = (assignment) => {
    const errors = {};
    if (!assignment) {
      errors.assignment = "Please enter assignment.";
    }
    if (assignment.length > 200) {
      errors.assignment = "Assignment should be at most 200 characters.";
    }

    return errors;
  };
  useEffect(() => {
    if (assignmentFromDb) {
      setAssignmentTitle(assignmentFromDb.assignment_title);
    }
  }, [assignmentFromDb]);

  const handleAssignmentDetail = (e) => {
    const input = e.target.value;
    const error = AssignmentValidation(input);
    if (Object.keys(error).length > 0) {
      setError(error);
    } else {
      setAssignmentTitle(input);
      setError({});
    }
  };
  return (
    <div className="flex flex-col gap-10 pt-10">
      <h3 className="text-[#646D89] font-[600] text-xl">Assignment detail</h3>
      <div className="flex flex-col gap-1">
        {error ? (
          <div className="flex gap-2">
            <label>Assignment *</label>
            <p className="text-red-500">{error.assignment}</p>
          </div>
        ) : (
          <label>Assignment *</label>
        )}
        <textarea
          type="text"
          className="border border-[#D6D9E4] rounded-[8px] h-12 py-3 pl-3 pr-4 outline-none"
          placeholder="please enter assignment"
          onChange={handleAssignmentDetail}
          rows={3}
          value={assignmentTitle}
        />
      </div>
    </div>
  );
};

export default AdminEditAssignmentDetail;
