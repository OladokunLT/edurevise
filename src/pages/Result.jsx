import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions, answers } = location.state || {};

  if (!questions || !answers) {
    return <Typography>Invalid result data.</Typography>;
  }

  const score = questions.reduce((acc, q, i) => {
    return answers[i] === q.correctAnswer ? acc + 1 : acc;
  }, 0);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Quiz Complete!
      </Typography>
      <Typography variant="h6" mb={2}>
        Your Score: {score} / {questions.length}
      </Typography>

      <List>
        {questions.map((q, i) => (
          <ListItem key={i}>
            <ListItemText
              primary={`Q${i + 1}: ${q.question}`}
              secondary={
                <>
                  <div>Your answer: {answers[i] || "None"}</div>
                  <div>Correct answer: {q.correctAnswer}</div>
                </>
              }
            />
          </ListItem>
        ))}
      </List>

      <Button variant="contained" onClick={() => navigate("/")}>
        Back to Home
      </Button>
    </Box>
  );
};

export default Result;
