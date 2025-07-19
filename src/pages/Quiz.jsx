import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import QuizCard from "../components/QuizCard";
import { Box, Button, Typography } from "@mui/material";
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

  handleNext = () => {
    if (index < questions.length - 1) {
      setAnswers(index + 1);
    } else {
      // Submit and go to result
      navigate("/result", { state: { questions, answers } });
    }
  };

  handlePrevious = () => {
    if (index > 0) setIndex(index - 1);
  };

  if (loading) <Typography>Loading...</Typography>;
  if (!questions.length) <Typography>No questions found</Typography>;

  return (
    <Box>
      <Typography>
        {subject.toUpperCase()} Quiz ({index + 1}/ {questions.length})
      </Typography>

      <QuizCard
        onSelect={handleSelect}
        questionData={questions[index]}
        selected={answers[index]}
      />

      <Box mt={2} display="flex" gap={2}>
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={index === 0}
        >
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
