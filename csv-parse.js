// Import the package
//const fs = require('csv-parse');
//import * as csv from 'node_modules/csv/lib/index.js';
const fs = require('fs');
const csv = require('csv');


// Run the pipeline
csv
// Generate 20 records
  .generate({
    delimiter: '|',
    length: 20
  })
// Transform CSV data into records
  .pipe(csv.parse({
    delimiter: '|'
  }))
// Transform each value into uppercase
  .pipe(csv.transform((record) => {
    return record.map((value) => {
      return value.toUpperCase();
    });
  }))
// Convert objects into a stream
  .pipe(csv.stringify({
    quoted: true
  }))
// Print the CSV stream to stdout
  .pipe(process.stdout);



  let list = document.getElementById("myList");
  data.forEach((item) => {
      let li = document.createElement("li");
      li.innerText = item;
      list.appendChild(li);
  