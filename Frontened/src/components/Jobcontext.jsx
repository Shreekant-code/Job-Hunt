// src/context/JobContext.js
import { createContext, useContext, useState } from "react";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);

  return (
    <JobContext.Provider value={{ jobs, setJobs, editingJob, setEditingJob }}>
      {children}
    </JobContext.Provider>
  );
};

// custom hook
export const useJobs = () => useContext(JobContext);

