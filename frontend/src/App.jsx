import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000";

function App() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    skills: "",
    performanceScore: "",
    experience: "",
  });

  const [employees, setEmployees] = useState([]);

  const [requiredSkills, setRequiredSkills] = useState("");
  const [minExperience, setMinExperience] = useState("");

  const [aiResults, setAiResults] = useState([]);

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // FETCH EMPLOYEES
  const fetchEmployees = async () => {

    try {

      const res = await axios.get(
        `${API_BASE}/api/employees`
      );

      setEmployees(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchEmployees();

  }, []);

  // ADD EMPLOYEE
  const addEmployee = async () => {

    try {

      await axios.post(
        `${API_BASE}/api/employees`,
        {
          ...formData,

          skills: formData.skills
            .split(",")
            .map((s) => s.trim()),

          performanceScore:
            Number(formData.performanceScore),

          experience:
            Number(formData.experience),
        }
      );

      alert("Employee Added Successfully");

      setFormData({
        name: "",
        email: "",
        department: "",
        skills: "",
        performanceScore: "",
        experience: "",
      });

      fetchEmployees();

    } catch (error) {

      console.log(error);

      alert("Error adding employee");

    }
  };

  // AI RECOMMENDATION
  const aiShortlist = async () => {

    try {

      const res = await axios.post(
        `${API_BASE}/api/ai/shortlist`,
        {
          requiredSkills:
            requiredSkills
              .split(",")
              .map((s) => s.trim()),

          minExperience:
            Number(minExperience),
        }
      );

      setAiResults(
        res.data.rankedEmployees
      );

    } catch (error) {

      console.log(error);

      alert("AI Recommendation Failed");

    }
  };

  return (

    <div className="container">

      <h1 className="title">
        AI Employee Performance System
      </h1>

      {/* ADD EMPLOYEE */}

      <div className="section">

        <h2>Add Employee</h2>

        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
        />

        <input
          type="number"
          name="performanceScore"
          placeholder="Performance Score"
          value={formData.performanceScore}
          onChange={handleChange}
        />

        <input
          type="number"
          name="experience"
          placeholder="Experience"
          value={formData.experience}
          onChange={handleChange}
        />

        <button onClick={addEmployee}>
          Add Employee
        </button>

      </div>

      {/* AI FILTER */}

      <div className="section">

        <h2>AI Recommendation</h2>

        <input
          type="text"
          placeholder="Required Skills"
          value={requiredSkills}
          onChange={(e) =>
            setRequiredSkills(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Minimum Experience"
          value={minExperience}
          onChange={(e) =>
            setMinExperience(e.target.value)
          }
        />

        <button onClick={aiShortlist}>
          Generate AI Recommendation
        </button>

      </div>

      {/* AI RESULTS */}

      <div className="section">

        <h2>AI Results</h2>

        <div className="card-grid">

          {
            aiResults.map((emp, index) => (

              <div className="card" key={index}>

                <h3>{emp.name}</h3>

                <p>
                  <strong>Department:</strong>
                  {" "}
                  {emp.department}
                </p>

                <p>
                  <strong>Skills:</strong>
                  {" "}
                  {emp.skills.join(", ")}
                </p>

                <p>
                  <strong>Performance:</strong>
                  {" "}
                  {emp.performanceScore}
                </p>

                <p>
                  <strong>Experience:</strong>
                  {" "}
                  {emp.experience} years
                </p>

                <p>
                  <strong>Match Score:</strong>
                  {" "}
                  {emp.matchScore}%
                </p>

                <p className="recommendation">
                  {emp.recommendation}
                </p>

                <p className="feedback">
                  {emp.feedback}
                </p>

              </div>
            ))
          }

        </div>

      </div>

      {/* EMPLOYEE LIST */}

      <div className="section">

        <h2>All Employees</h2>

        <div className="card-grid">

          {
            employees.map((emp) => (

              <div
                className="card"
                key={emp._id}
              >

                <h3>{emp.name}</h3>

                <p>{emp.email}</p>

                <p>
                  <strong>Department:</strong>
                  {" "}
                  {emp.department}
                </p>

                <p>
                  <strong>Skills:</strong>
                  {" "}
                  {emp.skills.join(", ")}
                </p>

                <p>
                  <strong>Performance:</strong>
                  {" "}
                  {emp.performanceScore}
                </p>

                <p>
                  <strong>Experience:</strong>
                  {" "}
                  {emp.experience} years
                </p>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  );
}

export default App;