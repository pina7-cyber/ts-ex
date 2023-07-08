import { isNumber } from "./utils";

interface Data {
  hours: number[]
  tar: number
}

interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const parseArguments = (args: string[]): Data => {
  if (args.length < 4) throw new Error("Not enough arguments");

  if (isNumber(process.argv.slice(2))) {
    return {
      hours: process.argv.slice(3).map((item) => Number(item)),
      tar: Number(process.argv[2]),
    };
  } else {
    throw new Error("Provided values were not all numbers!");
  }
};

export const calculateExercises = (hours: number[], tar: number): Result => {
  const initialValue = 0;
  const av =
    hours.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialValue
    ) / hours.length;
  const deviation = (av - tar) / tar;
  const rating = deviation >= 0 ? 3 : Math.abs(deviation) < 0.1 ? 2 : 1;

  return {
    periodLength: hours.length,
    trainingDays: hours.filter((day) => day > 0).length,
    success: av >= tar ? true : false,
    rating: rating,
    ratingDescription:
      rating === 2
        ? "not bad but could be better"
        : rating === 1
        ? "you should improve!"
        : "well done!",
    target: tar,
    average: av,
  };
};

try {
  const { hours, tar } = parseArguments(process.argv);
  console.log(calculateExercises(hours, tar));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
