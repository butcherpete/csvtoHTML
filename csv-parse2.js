// Import the package
const fs = require('fs');
const csv = require('csv');

const inputPath = 'perspective-type.csv'


// Run the pipeline
fs.createReadStream(inputPath)

	// Transform CSV data into records
  	.pipe(csv.parse({
		  trim: true,
		  comment: "#",
		  from_line: 2,
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
   	 	quoted: false
  	}))

	// Print the CSV stream to stdout
  	.pipe(process.stdout);
