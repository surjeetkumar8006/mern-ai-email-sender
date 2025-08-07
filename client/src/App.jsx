import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [numOfDoc, setNumOfDoc] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [receivers, setReceivers] = useState(""); // ✅ New: manually input receiver emails

  useEffect(() => {
    getDoc();
  }, []);

  const getDoc = async () => {
    try {
      const response = await axios.get("http://localhost:5000");
      setNumOfDoc(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!subject || !text || !receivers) {
      alert("All fields must be filled, including receiver emails.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000", {
        subject,
        text,
        receivers: receivers.split(",").map(email => email.trim()) // Convert comma-separated emails to array
      });
      console.log(response.data);
      alert(`Email has been sent to ${receivers.split(",").length} users.`);
    } catch (error) {
      console.log("Sending failed:", error);
      alert("Failed to send email.");
    }
  };

  const handleGenerateEmail = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/generate-email", {
        prompt
      });

      setText(res.data.emailBody);
      setSubject(res.data.subject || "Generated Subject"); // Optional: fill subject too
    } catch (error) {
      console.error("Failed to generate email:", error);
      alert("Failed to generate email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card m-4" style={{ width: "50rem" }}>
      <div className="card-body">
        <h2>MERN - AI Email Sender</h2>
        <hr />

        <textarea
          className="form-control mb-2"
          placeholder="Enter AI prompt here"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={handleGenerateEmail} className="btn btn-primary mb-4">
          {loading ? "Generating..." : "Generate Email using AI"}
        </button>

        <textarea
          className="form-control mb-2"
          placeholder="Enter subject here"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <textarea
          className="form-control mb-2"
          placeholder="Enter email body here"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* ✅ New field for entering recipient emails */}
        <textarea
          className="form-control mb-2"
          placeholder="Enter recipient emails (comma separated)"
          value={receivers}
          onChange={(e) => setReceivers(e.target.value)}
        />

        <button onClick={handleEmailSubmit} className="btn btn-success mt-3">
          Send Email
        </button>
      </div>
    </div>
  );
}

export default App;
