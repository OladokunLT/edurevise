import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import QuizCard from "../components/QuizCard";
import { Box, Button, Typography } from "@mui/material";
import ExplainButton from "../components/ExplainButton";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const subject = searchParams.get("subject");

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const module = await import(`../data/${subject}.json`);
        setQuestions(module.default);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load questions:", err);
      }
    };

    loadQuestions();
  }, [subject]);

  const handleSelect = (answer) => {
    setAnswers({ ...answers, [index]: answer });
  };

  const handleNext = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      // Submit and go to result
      navigate("/result", {
        state: { questions, answers },
      });
    }
  };

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (!questions.length) return <Typography>No questions found.</Typography>;

  const currentQuestion = questions[index];

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        {subject.toUpperCase()} Quiz ({index + 1}/{questions.length})
      </Typography>

      <QuizCard
        questionData={questions[index]}
        selected={answers[index]}
        onSelect={handleSelect}
      />

      <ExplainButton questionText={currentQuestion.question} />

      <Box mt={2} display="flex" gap={2}>
        <Button variant="outlined" onClick={handlePrev} disabled={index === 0}>
          Previous
        </Button>
        <Button variant="contained" onClick={handleNext}>
          {index === questions.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </Box>
  );
};

export default Quiz;
