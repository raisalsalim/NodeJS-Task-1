// Function to filter data based on parameters
export const filterByParams = (data, params) =>
  // Filtering data based on provided parameters
  data.filter(
    (e) =>
      // Checking if name matches filter (if provided)
      (!params.name || e.name.toLowerCase().includes(params.name.toLowerCase())) &&
      // Checking if fuel type matches filter (if provided)
      (!params.fuelType || e.fuel.toLowerCase() === params.fuelType.toLowerCase()) &&
      // Checking if selling price is within range (if provided)
      e.selling_price >= (params.priceFrom || 0) &&
      e.selling_price <= (params.priceTo || Infinity) &&
      // Checking if year matches filter (if provided)
      (!params.year || e.year === params.year)
  );
