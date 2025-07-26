import React, { useState } from "react";
import { Button, Typography, CircularProgress, Box } from "@mui/material";
import { generateExplanation } from "../ai/explanationService";

const ExplainButton = ({ questionText }) => {
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState("");

  const handleClick = async () => {
    setLoading(true);
    setExplanation(""); // Clear previous explanation

    try {
      const result = await generateExplanation(questionText);
      setExplanation(result);
    } catch (err) {
      setExplanation("Failed to generate explanation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={2}>
      <Button variant="outlined" onClick={handleClick} disabled={loading}>
        {loading ? "Generating..." : "Explain"}
      </Button>

      {loading && (
        <Box mt={1}>
          <CircularProgress size={20} />
        </Box>
      )}

      {explanation && (
        <Typography mt={2} variant="body2" color="text.secondary">
          {explanation}
        </Typography>
      )}
    </Box>
  );
};

export default ExplainButton;
