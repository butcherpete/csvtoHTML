const fs = require('fs');
const Papa = require("papaparse");
const { argv } = require('process');

//let inputPath;
//let outputPath;

/* if (process.argv.length !=4) {
    console.log("Pass two parameters: csv-input html-output");
    process.exit(1);
}
    else {
        inputPath = process.arg[3];
        outputPath = process.arg[4];
    }
 */
// Input variables
//const options = {/* options */}; papaparse option ignore first line
//const css-class = CSS class of definition list
const inputPath = 'shortcsv.csv';
const outputPath = 'html/dl-output.txt';

const dataStream = fs.createReadStream(inputPath)
const parseStream = Papa.parse(Papa.NODE_STREAM_INPUT);
dataStream.pipe(parseStream);

let writeStream = fs.createWriteStream(outputPath);
let data = [];
let output = "<dl class=\"myclass\">\n"; 
parseStream.on("data", chunk => {
    data.push(chunk);
    const m = new Map(data)
    for (let [k,v] of m) {
        output += ` <dt>${k}</dt>\n <dd>${v}</dd>\n`;
    }
    output = output += "</dl>";
    writeStream.write(output);

});

parseStream.on("finish", () => {
    writeStream.on('finish', () => {
        console.log('wrote all data to file');
    });
    //console.log(data);
    console.log(data.length);
    //console.log(output);
    //console.log(argv);
});
