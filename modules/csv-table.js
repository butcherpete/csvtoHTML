import * as fs from 'fs';
import csv from 'csv-parser'; 
import pretty from 'pretty';
import {createHeaderString, createRowString} from '../utils/utils.js';

const tableRows = [];
const tableHeaders =  [];

export function table_parse(input, output, options){

  	const inputPath = input;
	const outputPath = output;
	const tableRows = [];
	const tableHeaders =  [];
	const cliParameters = options;
	let columnIds;
	let firstColumn;
	let secondColumn;
	


	fs.createReadStream(inputPath)
	  .pipe(csv()) //
	  .on('error', () => {
	  // handle error 
	  })
	
	.on('headers',(headers) =>{
		let names = createHeaderString(options,headers); //Create headers based on 
		let header = names.headerString; 
	    tableHeaders.push(header);  // Add headerString to table headers array
		columnIds = names.resultHeader;
		console.log('The array of headers is available:')
		console.table(columnIds);
	})
	
	  .on('data', function (row) {
		console.log('The array of headers are available in data:')
		console.table(columnIds);

		let names = createRowString(columnIds); 
		//let rowString = `<tr><td> ${row[firstColumn]} </td><td> ${row[secondColumn]}</td></tr>`;
		console.log('\nReturned the rowstring:')
		console.log(names.rowString);
		let rows = names.rowString;
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
