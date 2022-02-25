const fs = require('fs');
const Papa = require("papaparse");
const inputPath = 'shortcsv.csv';

//const options = {/* options */};

console.log("start the stream")
const dataStream = fs.createReadStream(inputPath)
const parseStream = Papa.parse(Papa.NODE_STREAM_INPUT);

dataStream.pipe(parseStream);

let data = [];
let output = "<dl class=\"myclass\">\n"; 
parseStream.on("data", chunk => {
    data.push(chunk);
    const m = new Map(data)
    for (let [k,v] of m) {
        output += ` <dt>${k}</dt>\n <dd>${v}</dd>\n`;
    }
    output = output += "</dl>";
});

parseStream.on("finish", () => {
    //console.log(data);
    console.log(data.length);
    console.log(output);
    fs.createWriteStream("html/dl-output.txt", output);
});
