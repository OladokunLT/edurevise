import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { generateRawQuestions } from "../ai/questionGenerationService";

const GenerateQuestionForm = () => {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");
  const topics = ["Genetics", "Ecology", "Human Physiology", "Plant Biology"];

  const handleGenerate = async (topic) => {
    setLoading(true);
    setQuestion("");
    setError("");

    try {
      const generated = await generateRawQuestions(topic);

      if (generated.startsWith("Error:")) {
        setError(generated);
      } else if (generated.includes("Answer:")) {
        setQuestion(generated);
      } else {
        setError("Received invalid question format");
      }
    } catch (err) {
      setError("Generation failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 4, maxWidth: 800 }}>
      <Typography variant="h6" gutterBottom>
        Select a topic:
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        {topics.map((topic) => (
          <Button
            key={topic}
            variant="outlined"
            onClick={() => handleGenerate(topic)}
            disabled={loading}
          >
            {topic}
          </Button>
        ))}
      </Box>

      {loading && <CircularProgress sx={{ display: "block", mx: "auto" }} />}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {question && (
        <Paper sx={{ mt: 3, p: 3, bgcolor: "#f5f5f5" }}>
          <Typography variant="h6" gutterBottom>
            Generated Question:
          </Typography>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              fontFamily: "monospace",
              background: "white",
              padding: 16,
              borderRadius: 4,
            }}
          >
            {question}
          </pre>
        </Paper>
      )}
    </Box>
  );
};

export default GenerateQuestionForm;
