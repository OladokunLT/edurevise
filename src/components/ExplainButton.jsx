import React, { useState } from "react";
import { Button, Typography, Collapse, Box, IconButton } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

const ExplainButton = ({ explanation }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box mt={2}>
      <Button
        variant="outlined"
        onClick={() => setExpanded(!expanded)}
        endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
      >
        {expanded ? "Hide Explanation" : "Show Explanation"}
      </Button>

      <Collapse in={expanded}>
        <Typography mt={2} p={2} bgcolor="background.paper" borderRadius={1}>
          {explanation || "No explanation available for this question."}
        </Typography>
      </Collapse>
    </Box>
  );
};

export default ExplainButton;
