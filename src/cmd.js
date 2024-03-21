// Importing readline module to interact with the user via command line
import readline from "readline";

// Creating interface for reading user input and writing output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to prompt user for a value corresponding to the given question
const promptForValue = (question) =>
  new Promise((resolve) =>
    rl.question(question, (answer) =>
      // Resolving the promise with trimmed answer or undefined if empty
      resolve(answer.trim() || undefined)
    )
  );

// Function to prompt user for a budget
export const promptForBudget = async (question) => {
  // Prompting user for a budget value
  const budget = await promptForValue(question);
  // Parsing the budget value to float and returning
  return parseFloat(budget);
};

// Function to prompt user for filter values
export const enterValues = async () => {
  // Defining structure of filter values
  const structure = {
    name: "string",
    priceFrom: "number",
    priceTo: "number",
    fuelType: "string",
    year: "number",
  };
  // Object to store user-provided filter values
  const result = {};
  // Iterating through each filter key
  for (const key in structure) {
    if (Object.prototype.hasOwnProperty.call(structure, key)) {
      // Prompting user for value and storing it in result object
      result[key] = await promptForValue(`Enter value of ${key} to filter: `);
    }
  }
  // Returning user-provided filter values
  return result;
};

// Function to prompt user for yes or no
export const promptForYesOrNo = () =>
  new Promise((resolve) => {
    // Prompting user for yes/no input
    rl.question("Do you want to get filtered data? (yes/no): ", (answer) => {
      // Normalizing user input
      const normalizedAnswer = answer.trim().toLowerCase();
      // Resolving with true for yes, false for no, and re-prompting for invalid input
      if (normalizedAnswer === "yes" || normalizedAnswer === "y") {
        resolve(true);
      } else if (normalizedAnswer === "no" || normalizedAnswer === "n") {
        resolve(false);
      } else {
        // Handling invalid input
        console.log("Invalid input. Please enter yes or no.");
        // Recursive call for correct input
        promptForYesOrNo().then(resolve);
      }
    });
  });

// Function to prompt user for choice
export const promptForChoice = () => {
  return new Promise((resolve) => {
    // Displaying options for user
    console.log("Options:");
    console.log("1. Filter from all vehicles");
    console.log("2. Filter for expensive vehicle");
    console.log("3. Filter for inexpensive vehicle");
    // Prompting user for choice
    rl.question("Enter your choice: ", (choice) => {
      // Resolving with user choice
      resolve(choice);
    });
  });
};
