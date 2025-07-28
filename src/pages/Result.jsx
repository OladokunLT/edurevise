import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Chip,
  Paper,
  Divider,
} from "@mui/material";
import { Check, Close } from "@mui/icons-material";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions, answers, totalQuestions } = location.state || {};

  const score = useMemo(() => {
    if (!questions || !answers) return 0;
    return questions.reduce((acc, q, i) => {
      return answers[i] === q.correctAnswer ? acc + 1 : acc;
    }, 0);
  }, [questions, answers]);

  if (!questions || !answers) {
    return (
      <Box p={3}>
        <Typography variant="h6" color="error">
          No quiz results found
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{ mt: 2 }}
        >
          Back to Home
        </Button>
      </Box>
    );
  }

  const percentage = Math.round((score / questions.length) * 100);
  const performance =
    percentage >= 70
      ? "Excellent!"
      : percentage >= 50
      ? "Good job!"
      : "Keep practicing!";

  return (
    <Box p={3} maxWidth="800px" margin="0 auto">
      <Typography variant="h4" gutterBottom align="center">
        Quiz Results
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box textAlign="center">
          <Typography
            variant="h3"
            color={percentage >= 50 ? "success.main" : "error.main"}
          >
            {score}/{questions.length}
          </Typography>
          <Typography variant="h5">{percentage}%</Typography>
          <Typography variant="body1" mt={1}>
            {performance}
          </Typography>
          {/* <Chip
            label={`From ${totalQuestions} available questions`}
            size="small"
            sx={{ mt: 1 }}
          /> */}
        </Box>
      </Paper>

      <Typography variant="h6" mb={2}>
        Question Review:
      </Typography>

      <List sx={{ maxHeight: "60vh", overflow: "auto" }}>
        {questions.map((q, i) => {
          const isCorrect = answers[i] === q.correctAnswer;
          return (
            <React.Fragment key={i}>
              <ListItem
                alignItems="flex-start"
                sx={{ bgcolor: isCorrect ? "success.light" : "error.light" }}
              >
                <ListItemText
                  primary={`Q${i + 1}: ${q.question}`}
                  secondary={
                    <>
                      <Box component="span" display="block">
                        Your answer: {answers[i] || "Not answered"}
                      </Box>
                      <Box component="span" display="block">
                        Correct answer: {q.correctAnswer}
                      </Box>
                      <Box
                        component="span"
                        display="block"
                        mt={1}
                        fontStyle="italic"
                      >
                        Explanation: {q.explanation}
                      </Box>
                    </>
                  }
                />
                <Box ml={2}>
                  {isCorrect ? (
                    <Check color="success" fontSize="large" />
                  ) : (
                    <Close color="error" fontSize="large" />
                  )}
                </Box>
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          );
        })}
      </List>

      <Box textAlign="center" mt={3}>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{ px: 4, py: 1.5 }}
        >
          Back to Home
        </Button>
      </Box>
    </Box>
  );
};

export default Result;
