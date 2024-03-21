import { filterByParams } from "./helpers.js";

// Function to filter data based on user-provided filters
const filterData = (data, filtersKey = undefined) => {
  // If no filters provided, return all data
  if (!filtersKey) return data;
  
  // Filter data based on provided filters
  const result = filterByParams(data, filtersKey);
  
  // Return filtered result
  return result;
};

export default filterData;
