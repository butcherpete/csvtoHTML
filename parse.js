const fs = require('fs');
const csv = require('csv-parser');
const results = [];
const inputPath = 'perspective-type.csv';

//const data = [];

fs.createReadStream(inputPath)
    .pipe(csv(

        {
            mapHeaders: ({header, index }) => index.valueOf().toString().concat('-', index)
        }
        ))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        console.log(results);
    });