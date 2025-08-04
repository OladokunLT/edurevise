import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Paper,
  TextField,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const subjects = [
  { name: "English", code: "english" },
  { name: "Mathematics", code: "math" },
  { name: "Biology", code: "biology" },
  { name: "Chemistry", code: "chemistry" },
  { name: "Government", code: "government" },
];

const Home = () => {
  const navigate = useNavigate();
  const [questionCount, setQuestionCount] = useState(10);
  const [quizTime, setQuizTime] = useState(5);
  const [selectedSubject, setSelectedSubject] = useState("english");

  const startQuiz = () => {
    navigate(
      `/quiz?subject=${selectedSubject}&count=${questionCount}&time=${quizTime}`
    );
  };

  return (
    <Box p={3} maxWidth="800px" margin="0 auto">
      <Typography variant="h4" gutterBottom align="center">
        Welcome to EduRevise!
      </Typography>
      <Typography variant="body1" gutterBottom align="center">
        Select a subject and customize your quiz
      </Typography>

      <Grid container spacing={3} mt={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" mb={2}>
              Quiz Settings
            </Typography>

            <TextField
              select
              fullWidth
              label="Subject"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              sx={{ mb: 2 }}
            >
              {subjects.map((subject) => (
                <MenuItem key={subject.code} value={subject.code}>
                  {subject.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="Number of Questions"
              type="number"
              value={questionCount}
              onChange={(e) => {
                const value = Math.min(
                  50,
                  Math.max(1, parseInt(e.target.value) || 10)
                );
                setQuestionCount(value);
              }}
              inputProps={{ min: 1, max: 50 }}
              helperText={`Max 50 questions (${questionCount} selected)`}
            />

            <TextField
              fullWidth
              type="number"
              label="Time (minutes)"
              value={quizTime}
              onChange={(e) => {
                const value = Math.min(
                  120,
                  Math.max(1, parseInt(e.target.value) || 5)
                );
                setQuizTime(value);
              }}
              slotProps={{
                input: {
                  inputProps: {
                    min: 1,
                    max: 120,
                  },
                },
              }}
              helperText={`Timer: ${quizTime} minute(s)`}
              sx={{ mt: 2 }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Box textAlign="center" mt={2}>
            <Button
              variant="contained"
              size="large"
              onClick={startQuiz}
              sx={{ px: 6, py: 1.5 }}
            >
              Start Quiz
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
