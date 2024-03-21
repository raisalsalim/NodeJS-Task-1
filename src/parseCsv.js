import fs from "fs";
import path from "path";
import csv from "csv-parser";

// Function to parse CSV file
const parseCsv = (filename) => {
  return new Promise((resolve, reject) => {
    const data = [];
    // Reading CSV file stream
    fs.createReadStream(filename)
      .pipe(csv())
      .on("data", (row) => {
        // Pushing each row of CSV data to data array
        data.push(row);
      })
      .on("end", () => {
        // Logging completion message after parsing
        console.log(`${path.basename(filename)} has been parsed\n\n`);
        // Resolving with parsed data
        resolve(data);
      })
      .on("error", (error) => {
        // Rejecting with error if encountered
        reject(error);
      });
  });
};

export default parseCsv;
