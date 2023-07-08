import { isNumber } from "./utils";

interface Data {
  height: number
  mass: number
}

interface Result {
  height: number
  mass: number
  bmi: string
}

export const parseArguments = (args: string[], len?: number): Data => {
  const requiredArgs = len ? len : 4;
  const relevantArgs = len ? args : args.slice(2);
  console.log("showargs", args);
  if (args.length < requiredArgs || args.some((item) => item === undefined))
    throw new Error("Not enough arguments or some are undefined");
  if (args.length > requiredArgs) throw new Error("Too many arguments");

  if (isNumber(relevantArgs)) {
    return {
      height: Number(relevantArgs[0]),
      mass: Number(relevantArgs[1]),
    };
  } else {
    throw new Error("Provided values were not all numbers!");
  }
};

export const calculateBmi = (height: number, mass: number): Result => {
  const bmi = mass / (height / 100) ** 2;

  if (bmi < 16) {
    return {
      height: height,
      mass: mass,
      bmi: "Underweight (severe)",
    };
  } else if (16 <= bmi && bmi < 17) {
    return {
      height: height,
      mass: mass,
      bmi: "Underweight (moderate)",
    };
  } else if (17 <= bmi && bmi < 18.5) {
    return {
      height: height,
      mass: mass,
      bmi: "Underweight (mild)",
    };
  } else if (18.5 <= bmi && bmi < 25) {
    return {
      height: height,
      mass: mass,
      bmi: "Normal (healthy weight)",
    };
  } else if (25 <= bmi && bmi < 30) {
    return {
      height: height,
      mass: mass,
      bmi: "Overweight (pre-obese)",
    };
  } else if (30 <= bmi && bmi < 35) {
    return {
      height: height,
      mass: mass,
      bmi: "Overweight (class 1)",
    };
  } else if (35 <= bmi && bmi < 40) {
    return {
      height: height,
      mass: mass,
      bmi: "Overweight (class 2)",
    };
  } else {
    return {
      height: height,
      mass: mass,
      bmi: "Overweight (class 3)",
    };
  }
};

const performTask = (args: string[]) => {
  try {
    const { height, mass } = parseArguments(args);
    return calculateBmi(height, mass);
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    return { errorMessage };
  }
};

console.log(performTask(process.argv));
