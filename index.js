// Importing necessary functions and modules
import filterData from "./src/filters.js";
import parseCsv from "./src/parseCsv.js";
import { promptForChoice, enterValues, promptForYesOrNo, promptForBudget } from "./src/cmd.js";

// Main function to execute the program
const main = async () => {
  // Parsing the CSV file to get car data
  const cars = await parseCsv("./data/cars.csv");
  
  // Prompting user for choice
  const choice = await promptForChoice();

  // Handling user's choice
  if (choice === "1") {
    // If user chooses option 1, prompt for filter values
    const filters = await enterValues();
    
    // Filtering cars based on user's filters
    const data = filterData(cars, filters);
    
    // If no cars match the filter, display message and exit
    if (data.length === 0) {
      console.log("No vehicle matches your filter");
      process.exit(0);
    }
    
    // Prompting user to display filtered data
    const shouldDisplayData = await promptForYesOrNo();
    
    // Displaying filtered data if requested by user
    if (shouldDisplayData) {
      console.log("Filtered data:", JSON.stringify(data, null, 2));
    } else {
      // Displaying message if user cancels
      console.log("User cancelled. Exiting...");
    }
    // Exiting the program
    process.exit(0);
  }

  if (choice === "2") {
    const budgetForExpensive = await promptForBudget("Enter the budget for expensive vehicles:");
    const expensiveVehicles = cars.filter(car => car.selling_price > budgetForExpensive);
    if (expensiveVehicles.length === 0) {
      console.log("No vehicle matches your filter");
      process.exit(0);
    }
    const shouldDisplayExpensive = await promptForYesOrNo();
    if (shouldDisplayExpensive) {
      console.log("Expensive vehicles:", JSON.stringify(expensiveVehicles, null, 2));
    } else {
      console.log("User cancelled. Exiting...");
    }
    process.exit(0);
  }

  if (choice === "3") {
    const budgetForInexpensive = await promptForBudget("Enter the budget for inexpensive vehicles:");
    const inexpensiveVehicles = cars.filter(car => car.selling_price < budgetForInexpensive);
    if (inexpensiveVehicles.length === 0) {
      console.log("No vehicle matches your filter");
      process.exit(0);
    }
    const shouldDisplayInexpensive = await promptForYesOrNo();
    if (shouldDisplayInexpensive) {
      console.log("Inexpensive vehicles:", JSON.stringify(inexpensiveVehicles, null, 2));
    } else {
      console.log("User cancelled. Exiting...");
    }
    process.exit(0);
  }

  // Displaying message for invalid choice
  console.log("Invalid choice.");
  process.exit(1);
};

// Calling the main function to start the program
main();
