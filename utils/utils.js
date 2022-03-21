
// Get file name from inputpath
export function getFilename(pathfilename){
    let filenameextension = pathfilename.replace(/^.*[\\\/]/, '');
    let filename = filenameextension.substring(0, filenameextension.lastIndexOf('.'));
    //let ext = filenameextension.split('.').pop();
    return filename;
  }
  
// Creates default output html path from input CSV path and command
export function createOutputPath(inputPath, userCommand, outputPath){
    let defaultOutputPath;
    if (outputPath == 'defaultPath') {
        defaultOutputPath = `output/${userCommand}/${inputPath}.htm`;
    } else {
         defaultOutputPath = outputPath;
    }
    return defaultOutputPath;
}

//Throws column length error
export function throwsColumnError(value) {
    this.value = value;
    this.message = `The CSV inputFile contains ${value} columns of data. Two columns are required for DL conversions.`;
    this.toString = function() {
      return this.value + this.message;
    };
  }


// Creates headerString
export function createHeaderString(options,headers){

    //let myheaderString = '';
    //let myfirstColumn;
    //let mysecondColumn;
    //console.log('\n WE ARE IN THE UTILITY FUNCTION:');
    //console.log('These are the headers from the CSV file:');
    //console.table(headers);
    //console.log('These are the replacement headers from the CLI:');
    //console.table(options.replaceHeaders);

    let opLength = headers.length;
    let headerString = [];
    let columnString = '';
    let headerColumn = '';
    let columnHeaders = [];

    // Need function to count number of elements in array (replaceHeaders or headers) and write a string for each
	// number that accounts for each number of elements in the array.  This string defines the headerString
	// let length = headers.length

    // Check if replacement headers are defined
	if (options.hasOwnProperty('replaceHeaders')) {
        let rpLength = options.replaceHeaders.length;

        console.log('\n We have the same number of headers in the CLI and CSV.');
        console.log('We will use replaceHeaders to define the column headers:');
        console.table(options.replaceHeaders);

        // if # of replacement headers equals column headers
        if (opLength == rpLength) {
            let headerString = '';
            let columnString = '';
            let headerColumn = '';
            let columnHeaders = [];

            for (let i = 0; i < options.replaceHeaders.length; i++) {
                //Define array of column headings
                headerColumn = `column${i}`;
                columnHeaders.push(headerColumn);
                //Define headerString
                columnString = `<tr><th>${options.replaceHeaders[i]}</th>`;
                headerString += columnString;
            }

            console.log('\n This is the array of column headers:')
            console.table(columnHeaders);
            console.log('This is the array of column headers:')
            let replacementHeaders = options.replaceHeaders;
            console.table(replacementHeaders);

            const resultHeader = Object.fromEntries(
                columnHeaders.map((array1value, index) => [array1value, replacementHeaders[index]])
            );
            console.log('\nWell this is what you get:');
            console.table(resultHeader);

            headerString += '</tr>';
            //console.log('\n This is the headerString outside the loop:')
            //console.log(headerString);
            return {resultHeader, headerString};

        } else {
            // Return error because replacement headers do not match number of column headers
            console.log('Arrays do not have the same number of elements.');
            console.log('You have not specified the correct number of replacement headers.');
            console.log(`The CSV has ${opLength} headers. You have specified ${rpLength} headers.`);
            console.log('Check the number of replacement headers and rerun.');
            // At this point I need to throw an error and kill the process.
            };
    } else {
        // Use the column headers in the CSV file to define headerString and columnHeaders
        //let csvHeaders;

        for (let i = 0; i < headers.length; i++) {
            //Create array of column variables, one for each element
            // Create a variable for each element
            headerColumn = `column${i}`;
            //Add variable to an array
            columnHeaders.push(headerColumn);

            //Define headerString
            //Write string frag for each element
            columnString = `<tr><th>${headers[i]}</th>`;
            //Add string frag to the complete string
            headerString += columnString;
        }
        console.log('Where am i?')
        console.table(headers);
        //csvHeaders = headers;
        //console.table(csvHeaders);

        let resultHeader = Object.fromEntries(
            columnHeaders.map((array1value, index) => [array1value, headers[index]])
            );
        headerString += '</tr>';
        //console.log('\n This is the headerString outside the loop:')
        //console.log(headerString);
        return {resultHeader, headerString};
    }

}

//Create row string
export function createRowString(columnIds){
    let rowString = '<tr>';
    let columnString = '';
    console.log('The array of headers are available in utils:')
	console.table(columnIds);
    //let Length = columnIds.length;

    //console.log(typeof columnIds);

    for (const [key, value] of Object.entries(columnIds)) {
        //console.log('key-value pairs:');
        //console.log(`${key}: ${value}`);
        columnString = `<td>row["${value}"]</td>`
        //console.log(columnString);
        rowString += columnString;
        //console.log(rowString);
    }


    rowString += '</tr>';
    console.log(rowString);
    return {rowString};
}
