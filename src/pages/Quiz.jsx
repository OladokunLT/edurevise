import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import QuizCard from "../components/QuizCard";
import { Box, Button, Typography, LinearProgress } from "@mui/material";
import ExplainButton from "../components/ExplainButton";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [displayedQuestions, setDisplayedQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);

  const subject = searchParams.get("subject");
  const questionCount = parseInt(searchParams.get("count")) || 10;
  const quizTime = parseInt(searchParams.get("time")) || 5;

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const module = await import(`../data/${subject}.json`);
        const allQuestions = module.default;

        // Shuffle and select requested number of questions
        const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, Math.min(questionCount, 50));

        setQuestions(allQuestions);
        setDisplayedQuestions(selected);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load questions:", err);
        navigate("/", { replace: true });
      }
    };

    loadQuestions();
  }, [subject, questionCount, navigate]);

  useEffect(() => {
    const totalSeconds = quizTime * 60;
    setTimeLeft(totalSeconds);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev < 1) {
          clearInterval(timerRef.current);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [quizTime]);

  const handleSelect = (answer) => {
    setAnswers({ ...answers, [index]: answer });
  };

  const handleNext = () => {
    if (index < displayedQuestions.length - 1) {
      setIndex(index + 1);
      setShowExplanation(false);
    } else {
      navigate("/result", {
        state: {
          questions: displayedQuestions,
          answers,
          totalQuestions: questions.length,
        },
      });
    }
  };

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
    setShowExplanation(true);
  };

  const handleAutoSubmit = () => {
    navigate("/result", {
      state: {
        questions: displayedQuestions,
        answers,
        totalQuestions: questions.length,
      },
    });
  };

  if (loading)
    return (
      <Box p={3} textAlign="center">
        <Typography variant="h5" mb={2}>
          Loading {questionCount} {subject} questions...
        </Typography>
        <LinearProgress />
      </Box>
    );

  if (!displayedQuestions.length)
    return (
      <Box p={3}>
        <Typography variant="h5" color="error">
          No questions available for {subject}
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

  const currentQuestion = displayedQuestions[index];
  const progress = ((index + 1) / displayedQuestions.length) * 100;

  return (
    <Box p={3} maxWidth="800px" margin="0 auto">
      <Box mb={2}>
        <Typography
          variant="subtitle1"
          sx={{
            mb: 1,
            fontWeight: "bold",
            color:
              timeLeft <= 60
                ? "error.main"
                : timeLeft <= 120
                ? "orange"
                : "text.primary",
          }}
        >
          Time Left:{" "}
          {Math.floor(timeLeft / 60)
            .toString()
            .padStart(2, "0")}
          : {(timeLeft % 60).toString().padStart(2, "0")}
        </Typography>
        <LinearProgress variant="determinate" value={progress} />
        <Typography variant="subtitle2" mt={0.5} textAlign="right">
          {index + 1}/{displayedQuestions.length} ({Math.round(progress)}%)
        </Typography>
      </Box>

      <Typography variant="h5" mb={2}>
        {subject.charAt(0).toUpperCase() + subject.slice(1)} Quiz
      </Typography>

      <QuizCard
        questionData={currentQuestion}
        selected={answers[index]}
        onSelect={handleSelect}
      />

      <ExplainButton
        explanation={currentQuestion.explanation}
        expanded={showExplanation}
        onToggle={() => setShowExplanation((prev) => !prev)}
      />

      <Box mt={3} display="flex" justifyContent="space-between">
        <Button variant="outlined" onClick={handlePrev} disabled={index === 0}>
          Previous
        </Button>
        <Button variant="contained" onClick={handleNext}>
          {index === displayedQuestions.length - 1
            ? "Finish Quiz"
            : "Next Question"}
        </Button>
      </Box>
    </Box>
  );
};

export default Quiz;
