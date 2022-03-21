
import * as fs from 'fs';
import csv from 'csv-parser'; 
//import csv = require('csv-parser');
import pretty from 'pretty';
import {throwsColumnError} from '../utils/utils.js';

//const inputPath = 'csv/job-types.csv'
//const outputPath = 'dl/job-types.txt';


export function dl_parse(input, output, options){
	//const csv =  new CsvParser(opts);

	const inputPath = input;
	const outputPath = output;
	const tableRows = [];
	const tableHeaders =  [];
	const cliParameters = options;
	let firstColumn;
	let secondColumn;
	
	fs.createReadStream(inputPath)
	  .pipe(csv())
	  .on('error', () => {
	  // handle error 
	  })
	
	  .on('headers',(headers) =>{
		let headerLength = headers.length;
		if (headerLength == 2) {
			console.log('CSV contains two columns of data!');
			firstColumn = headers[0];
			secondColumn = headers[1];
		} else {
			throw new throwsColumnError(headerLength);
			//console.log('CSV must contain only two columns of data');
			}
	  })

	  .on('data', function (row) {
	    //let rows = `<div class='row-group'><dt><code> ${row["ID"]} </code></dt><dd> ${row["Definition"]}</dd></div>`;
		let rows = `<div class='row-group'><dt><code> ${row[firstColumn]} </code></dt><dd> ${row[secondColumn]}</dd></div>`;
	    tableRows.push(rows); 
	    })
	
	  .on('end', function () {
	    const tableStart = `<dl class='${options.css}'>`;
	    const tableEnd = '</dl>';
	
	    //let tableRows = JSON.stringify(null, '\n');
	    let htmlList = tableStart.concat(tableHeaders, tableRows.join(""), tableEnd);
	
	    htmlList = JSON.stringify(htmlList, null, "");
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
	        console.log(html);
			console.log(cliParameters);
	      }
	    });
	}
  //return html;
 
	
};
      
