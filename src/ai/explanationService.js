import { pipeline, env } from "@xenova/transformers";

// Use Xenova-hosted model assets
env.localModelPath = "https://huggingface.co/Xenova";

let explainer;

export async function loadExplanationModel() {
  try {
    if (!explainer) {
      explainer = await pipeline(
        "text-classification",
        "Xenova/distilbert-base-uncased-finetuned-sst-2-english"
      );
    }
    return explainer;
  } catch (error) {
    console.error("Failed to load explanation model:", error);
    throw new Error("Model loading failed");
  }
}

export async function generateExplanation(questionText) {
  try {
    const model = await loadExplanationModel();
    const result = await model(questionText);
    return `This question is categorized as "${
      result[0].label
    }" with confidence ${Math.round(
      result[0].score * 100
    )}%. This suggests the answer is probably targeting a ${
      result[0].label === "POSITIVE" ? "favorable" : "challenging"
    } concept.`;
  } catch (error) {
    console.error("Failed to generate explanation:", error);
    return "Unable to generate explanation due to an error.";
  }
}
