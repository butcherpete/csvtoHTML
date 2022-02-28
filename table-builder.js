const fs = require('fs');
const Papa = require("papaparse");
const { argv } = require('process');

const inputPath = 'job-types.csv';
const outputPath = 'html/table-test.txt';

const dataStream = fs.createReadStream(inputPath)
const parseStream = Papa.parse(Papa.NODE_STREAM_INPUT);
//const parseStream = Papa.parse(Papa.NODE_STREAM_INPUT, options);
dataStream.pipe(parseStream);

let writeStream = fs.createWriteStream(outputPath);
let data = [];


parseStream.on("data", chunk => {
    let output = "<table class=\"myclass\" border=1>\n";
    data.push(chunk);
    writeStream.write(output);

});

parseStream.on("finish", () => {
    writeStream.on('finish', () => {
        console.log('wrote all data to file');
    });
    console.log(data);
    console.log(data.length);
    //console.log(output);
    //console.log(argv);
});


/* // https://stackoverflow.com/questions/15164655/generate-html-table-from-2d-javascript-array
function createTable(data) {
    let result = ['<table border=1>']; 
    for(let row of data) {
        result.push('<tr>');  
        for(let cell of row){
            result.push(`<td>${cell}</td>`);  
        }
        result.push('</tr>');
    }
    result.push('</table>'); // \dl
    return result.join('\n');
  }
 */

/* //let htmlTable = '';
fs.readFile('/etc/passwd', function (err, data) {
  if (err) {
    throw err;
  }
 
  const parsedData = parseData(data);
  htmlTable = createTable(parsedData);
}); */