import express from "express";
import { calculateBmi, parseArguments } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import { isNumber } from "./utils";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    console.log("args", req.query.height);
    const { height, mass } = parseArguments(
      [req.query.height as string, req.query.mass as string],
      2
    );
    
    const data = calculateBmi(Number(height), Number(mass));
    res.json(data);
  } catch (error: unknown) {
    let errorMessage = "Internal Server Error";
    if (error instanceof Error) {
      errorMessage = "malformatted parameters: " + error.message;
      res.status(400).json({ error: errorMessage });
    }
    res.status(500).json({ error: errorMessage });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!target || !daily_exercises) {
    return res.status(400).send({ error: "parameters missing" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!isNumber(daily_exercises) || isNaN(Number(target))) {
    return res.status(400).send({ error: "malformatted parameters" });
  }
  const result = calculateExercises(
    // eslint-disable-next-line
    daily_exercises.map((item: any) => Number(item)),
    Number(target)
  );
  return res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
