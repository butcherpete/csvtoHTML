import * as fs from 'fs';
import * as csv from 'csv-parser';
import * as pretty from 'pretty';


const inputPath = 'csv/perspective-type.csv'
const outputPath = 'table/perspectives.htm';

const tableRows = [];
const tableHeaders =  [];

export function table_parse(input, output, options){

	fs.createReadStream(inputPath)
	  .pipe(csv())
	  .on('error', () => {
	  // handle error 
	  })
	
	  .on('headers',(headers) =>{

	    //console.log(`First header: ${headers[0]} and Second header: ${headers[1]}`)
	    let header = `<tr><th> ${headers[0]} </th><th> ${headers[1]}</th></tr>`;
	    tableHeaders.push(header);
	    })
	
	  .on('data', function (row) {
	    let rows = `<tr><td> ${row["ID"]} </td><td> ${row["Definition"]}</td></tr>`;
	    tableRows.push(rows);   
	    })
	
	  .on('end', function () {
	    const tableStart = '<table>';
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
	        console.log(html);
	      }
	    });
	  }
}
