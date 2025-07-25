import React from "react";
import {
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const QuizCard = ({ questionData, selected, onSelect }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6">{questionData.question}</Typography>

        <RadioGroup
          value={selected || ""}
          onChange={(e) => onSelect(e.target.value)}
        >
          {questionData.options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default QuizCard;
