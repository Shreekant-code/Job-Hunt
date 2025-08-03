import { useEffect, useState } from "react";

import axios from "axios";
import "./View.css"
import { GiCancel } from "react-icons/gi";

export const View = ({id,onClose}) => {
  
  const [showdata, setData] = useState(null);

  const showdatabyid = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/jobs/${id}`);
      setData(res.data);
    } catch (error) {
      console.log("Error in fetching:", error.message);
    }
  };

  useEffect(() => {
    showdatabyid();
  }, [id]);

  if (!showdata) {
    return <p>Loading...</p>;
  }

  return (
    <div className="view-container">
        <div className="cards">
        <div className="cancel">
<GiCancel onClick={onClose} />

            </div>

      <h2>{showdata.title}</h2>
      <p><strong>Company:</strong> {showdata.company}</p>
      <p><strong>Location:</strong> {showdata.location}</p>
      <p><strong>Skills:</strong> {showdata.Skill?.join(", ") || "N/A"}</p>
      <p><strong>Requirements:</strong> {showdata.requirements?.join(", ") || "N/A"}</p>
      <p><strong>Description:</strong> {showdata.description}</p>
      <p><strong>Salary:</strong> {showdata.salary}</p>
      </div>
    </div>
  );
};
