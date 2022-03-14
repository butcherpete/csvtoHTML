
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
