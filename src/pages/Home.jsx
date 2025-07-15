import React from "react";
import { Box, Typography, Grid, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const subjects = [
  { name: "Biology", code: "biology" },
  { name: "Mathematics", code: "math" },
  { name: "English", code: "english" },
];

const Home = () => {
  const navigate = useNavigate();

  const startQuiz = (subjectCode) => {
    navigate(`/quiz?subject=${subjectCode}`);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Welcome to EduRevise!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Select a subject to begin your revision quiz.
      </Typography>

      <Grid container spacing={3} mt={2}>
        {subjects.map((subject) => (
          <Grid item xs={12} sm={6} md={4} key={subject.code}>
            <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
              <Typography variant="h6">{subject.name}</Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => startQuiz(subject.code)}
              >
                Start Quiz
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
