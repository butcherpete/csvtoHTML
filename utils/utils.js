
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


// Creates headerString
export function createHeaderString(options,headers){

    //let myheaderString = '';
    //let myfirstColumn;
    //let mysecondColumn;
    console.log('\n WE ARE IN THE UTILITY FUNCTION:');
    console.log('These are the headers from the CSV file:');

    console.table(headers);
    console.log('These are the replacement headers from the CLI:');
    console.table(options.replaceHeaders);


    let opLength = headers.length;
    let rpLength = options.replaceHeaders.length;
    let headerString2 = [];
    let columnString2 = '';
    let headerColumn2 = '';
    let columnHeaders2 = [];


    // Need function to count number of elements in array (replaceHeaders or headers) and write a string for each
	// number that accounts for each number of elements in the array.  This string defines the headerString
	// let length = headers.length

    // Check if replacement headers are defined
	if (options.hasOwnProperty('replaceHeaders')) {

        console.log('\n We have the same number of headers in the CLI and CSV.');



        // if # of replacement headers equals column headers
        if (opLength == rpLength) {
            let headerString2 = '';
            let columnString2 = '';
            let headerColumn2 = '';
            let columnHeaders2 = [];
            console.log('\nArrays have the same number of elements.');
            //Send each replaceHeaders column to function

            for (let i = 0; i < options.replaceHeaders.length; i++) {
                //Define array of column headings
                headerColumn2 = `column${i}`;
                //console.log('The value of the columns passed:');
                //console.log(headerColumn2);
                columnHeaders2.push(headerColumn2);
                //console.table(columnHeaders2);

                //Define headerString
                columnString2 = `<tr><th>${options.replaceHeaders[i]}</th>`;
                headerString2 += columnString2;

            }
            console.log('\n This is the array of column headers:')
            console.table(columnHeaders2);
            headerString2 += '</tr>';
            console.log('\n This is the headerString outside the loop:')
            console.log(headerString2);
            return {columnHeaders2, headerString2};
            

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

        for (let i = 0; i < headers.length; i++) {
            //Create array of column variables, one for each element
            // Create a variable for each element
            headerColumn2 = `column${i}`;
            //Add variable to an array
            columnHeaders2.push(headerColumn2);

            //Define headerString
            //Write string frag for each element
            columnString2 = `<tr><th>${options.replaceHeaders[i]}</th>`;
            //Add string frag to the complete string
            headerString2.push(columnString2);
        }
        //return headerString2, columnHeaders2;
    }
    //return headerString2, columnHeaders2;     
};
