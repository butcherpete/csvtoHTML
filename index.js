const fs = require('fs')
const csv = require('csv-parser')
const pretty = require('pretty');

const inputPath = 'job-types.csv'
const outputPath = 'html/job-types.htm';


//let writeStream = fs.createWriteStream(outputPath);
/* const tableStart = [];
tableStart.push(tableClass);

 */
const tableRows = [];
const tableHeaders =  [];

/* function generateUsername(firstname, surname) {
    return `${firstname[0]}-${surname}`.toLowerCase();
}
 */

fs.createReadStream(inputPath)
    .pipe(csv())
    .on('error', () => {
        // handle error 
    })

    .on('headers',(headers) =>{

        //console.log(`First header: ${headers[0]} and Second header: ${headers[1]}`)
        let header = `<tr><th> ${headers[0]} </th><th> ${headers[1]}</th></tr>\n`;
        tableHeaders.push(header);
      
    })

    .on('data', function (row) {
        let rows = `<tr><td> ${row["ID"]} </td><td> ${row["Definition"]}</td></tr>\n`;
        tableRows.push(rows);
        
    })

    .on('end', function () {
        //console.log(tableRows);
        //console.log(tableHeaders);
        const tableStart = '<table>';
        const tableEnd = '</table>';
        //tableHeaders.toString;
        //tableRows.toString;

        //let tableRows = JSON.stringify(null, '\n');
        let htmlList = tableStart.concat(tableHeaders, tableRows.join(""), tableEnd);

        htmlList = JSON.stringify(htmlList, null, "");
        let html = new String();
        html = htmlList.toString().replace(/\"/g, "");
        html = pretty(html, {ocd: true});
        //html = html.split('\n');
 

        //html = html.replace(/\"/g, "");
       //console.log(pretty(html, {ocd: true}));
       writeToCSVFile(html)
    })

    function writeToCSVFile(html) {
        const filename = 'output.txt';

        //const tableEnd = ['</table>']

        fs.writeFile(filename, html, err => {
          if (err) {
            console.log('Error writing to csv file', err);
          } else {
            console.log(`saved as ${filename}`);
            console.log(html);
          }
        });
      }
      
/*       function extractAsCSV(users) {
        const header = ["Username, Password, Roles"];
        const rows = users.map(user =>
           `${user.username}, ${user.password}, ${user.roles}`
        );
        return header.concat(rows).join("\n");
      }
 */      