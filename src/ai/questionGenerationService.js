const API_URL = "http://localhost:3001/generate-question";

export async function generateRawQuestions(topic = "human physiology") {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // Validate response format
    if (data.question && data.question.includes("Answer:")) {
      return data.question;
    }

    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Generation error:", error);
    return "Error: " + error.message;
  }
}
