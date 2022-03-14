/*
* Wrap results in table
** Transform array to string?
** Add table to front of array? Add tableclose to end?
** Add ability to created headers?


*/


const fs = require('fs');
const  csv= require("csv-parser");
const { argv } = require('process');

const inputPath = 'job-types.csv'
const outputPath = 'html/job-types.htm';
const tableClass = '<table class ="myCustomTableClass">';

let writeStream = fs.createWriteStream(outputPath);
const tableStart = [];
tableStart.push(tableClass);
const headerRows = [];
const rows = [];
const tableEnd = ['</table>']


fs.createReadStream(inputPath)
    .on('error', () => {
        // handle error 
    })
    .pipe(csv({skipLines:0, skipComments:true}))
    .on('headers',(headers) =>{
        //console.log(`First header: ${headers[0]} and Second header: ${headers[1]}`)
        let headerRow = `<tr><th> ${headers[0]} </th><th> ${headers[1]}</th></tr>`;
        //console.log(headerRow)
        headerRows.push(headerRow);
        //console.log(headerRows)

    })
    .on('data', (row) => {
        //console.log(row);
        let results = `<tr><td> ${row["ID"]} </td><td> ${row["Definition"]}</td></tr>`;
        rows.push(results);

        //writeStream.write(table);
    })
    .on('end', () => {
        //handle end of csv
       //let closing = '</table>';
        //str += closing;
        //console.log(rows);
        //console.log(headerRows);
        //console.log(tableStart);
    
        let html = tableStart.concat(headerRows, rows, tableEnd);
        console.log(html);
        writeStream.on('end', () => {
            console.log('wrote all data to file');
        });
        //console.log(html);
        //return end;
    })

    //console.log(end);