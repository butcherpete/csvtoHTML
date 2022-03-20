import * as fs from 'fs';
import csv from 'csv-parser'; 
import pretty from 'pretty';



const tableRows = [];
const tableHeaders =  [];

export function table_parse(input, output, options){

  	const inputPath = input;
	const outputPath = output;
	const tableRows = [];
	const tableHeaders =  [];
	const cliParameters = options;
	let firstColumn;
	let secondColumn;

	fs.createReadStream(inputPath)
	  .pipe(csv()) //
	  .on('error', () => {
	  // handle error 
	  })
	
	  .on('headers',(headers) =>{

		let exists = options.hasOwnProperty('escape');
		console.log(exists);
		
		let headerString = '';

		// Need function to count number of elements in array (replaceHeaders or headers) and write a string for each
		// number that accounts for each number of elements in the array.  This string defines the headerString
		// let length = headers.length

		if (options.hasOwnProperty('replaceHeaders')) {
			headerString = `<tr><th> ${options.replaceHeaders[0]} </th><th> ${options.replaceHeaders[1]}</th></tr>`;
			firstColumn = options.replaceHeaders[0];
			secondColumn = options.replaceHeaders[1];
		} else {
			headerString = `<tr><th> ${headers[0]} </th><th> ${headers[1]}</th></tr>`
			firstColumn = headers[0];
			secondColumn = headers[1];
		};

		//console.table(headers);
		//let length = headers.length;
		//console.log(length);
		//let inputLength = options.replaceHeaders.length;
		//console.log(inputLength);
		//headers.forEach(element => console.log(element));
		//options.replaceHeaders.forEach(element => console.log(element));
	    //console.log(`First header: ${headers[0]} and Second header: ${headers[1]}`)
	    //let header = `<tr><th> ${headers[0]} </th><th> ${headers[1]}</th></tr>`;
		//let header = `<tr><th> ${options.replaceHeaders[0]} </th><th> ${options.replaceHeaders[1]}</th></tr>`;

		let header = headerString;
	    tableHeaders.push(header);
	    })
	
	  .on('data', function (row) {
		//console.log(row[headers[0]]);
		//row.forEach(element => console.log(element));

	    // Need function to count number of elements in array (replaceHeaders or headers) and write a row string for each
		// number matches the number of elements in the array.  This string defines the rowString
		// let length = headers.length

		let rowString = `<tr><td> ${row[firstColumn]} </td><td> ${row[secondColumn]}</td></tr>`;
	    let rows =  rowString;
	    tableRows.push(rows);   
	    })
	
	  .on('end', function () {
	    const tableStart = `<table class='${options.css}'>`;
	    const tableEnd = '</table>';
	
	    //let tableRows = JSON.stringify(null, '\n');
	    let htmlList = tableStart.concat(tableHeaders, tableRows.join(""), tableEnd);
	    //htmlList = JSON.stringify(htmlList, null, "");
	    let html = new String();
	    html = htmlList.toString().replace(/\"/g, "");
	    html = pretty(html, {ocd: true});
	    writeToCSVFile(html)
	  })

	  function writeToCSVFile(html) {
	    const filename = outputPath;
	
	    fs.writeFile(filename, html, err => {
	      if (err) {
	        console.log('Error writing to csv file', err);
	      } else {
	        console.log(`saved as ${filename}`);
	        //console.log(html);
          	console.log(cliParameters);
	      }
	    });
	  }
}
