import * as fs from 'fs';
import csv from 'csv-parser'; 
import pretty from 'pretty';
import {createHeaderString} from '../utils/utils.js';



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
		let names = createHeaderString(options,headers);
		console.log('\n WE ARE BACK IN CSV-TABLE:');
		console.log('\nThis is the header string returned to the main function:');
		console.log(names.headerString);
		console.log('\nThese variables should represent e.g. column0 = headers[0] or column0 = options.replaceHeaders[0]:')
		console.table(names.resultHeader);  

		// MUST DEFINE VARIABLES THAT REPRESENT EACH ELEMENT IN THE options.representHeader[x];
		// THE VARIABLE HOLDS THIS VALUE; USED TO SPECIFY THE VALUES OF ROWS IN DATA FUNCTION

/* 		let headerString = '';
		if (options.hasOwnProperty('replaceHeaders')) {
			headerString = `<tr><th> ${options.replaceHeaders[0]} </th><th> ${options.replaceHeaders[1]}</th></tr>`;
			firstColumn = options.replaceHeaders[0];
			secondColumn = options.replaceHeaders[1];
		} else {
			headerString = `<tr><th> ${headers[0]} </th><th> ${headers[1]}</th></tr>`
			firstColumn = headers[0];
			secondColumn = headers[1];
		};
 */
		// Define header variable for  headerString
		let header = names.headerString;
		// Add headerString to table headers array
	    tableHeaders.push(header);
	})
	
	  .on('data', function (row) {
		//console.log(row[headers[0]]);
		//row.forEach(element => console.log(element));

	    // Need function to count number of elements in array (replaceHeaders or headers) and write a row string for each
		// number matches the number of elements in the array.  This string defines the rowString
		// let length = headers.length

		//FOR EACH ELEMENT IN NAMES.COLUMNHEADERS
		// PASS THE VARIABLE (EG COLUMN0)
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
