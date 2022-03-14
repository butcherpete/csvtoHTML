#!/usr/bin/env node
import { Command, Option } from "commander";
import { dl_parse } from './modules/csv-dl.js';
import { table_parse } from './modules/csv-table.js';
//import {} from './modules/csv-table.js';
import {getFilename,createOutputPath} from './utils/utils.js';

//import tables from "./commands/tables.js";
//import convert from "./commands/convert.js";
//import info from "./commands/info.js";
// Enable ds to write folders if they do not exist. https://stackoverflow.com/questions/21194934/how-to-create-a-directory-if-it-doesnt-exist-using-node-js
// Fix hyphented command names per tutorial
// Rename dl command
// Remove commander Option, git if I can
// Update initial varaibles 
// Add wrapper HTML to HTML output
// Add preview server
// Add ignore file for node_modules

const program = new Command();
let inputFile = '';
let newOutPutPath = '';
let userCommand = '';

program.description("Convert csv data to HTML definition lists (<dl>) or tables (<table>).");
program.name("csvtohelp");
program.usage("<file><options><command>");
program.addHelpCommand(true);
program.helpOption(true);
 
program
  .command("dls")
  .argument("<inputFile>", "Specify path to flatfile. For example, 'data.csv', 'data.csv'")
  .option('-o, --outputFile [value]', 'option with a default value', 'defaultPath')
  .option("-b --browser", "Serve HTML to browser using specified CSS")
  .option("-C, --skipComments", "Ignore commented lines in inputFile. Commented lines begin with the '#' character.")
  .option('-d, --delimiter <value>', 'identify the delimiter in the InputFile. For example, ";" (semi-colon), or "|" (pipe)', ',')
  .option("-i, --includeHeader", "Include the first row in the inputFile. First row is excluded by default.")
  .option('-p --preview', 'Serve HTML to browser using specified CSS', false)
  .option('-sk, --skipComments', 'Ignore commented lines in inputFile. Commented lines begin with the "#" character.', false)
  .option('-d, --delimiter <value>', 'identify the delimiter in the InputFile. For example, ";" (semi-colon), or "|" (pipe)', ',')
  .option("-sl, --skipLines <number>", "Skip the specified number of lines at the begining of inputFile")
  .option('-c, --css <class>', 'Specify CSS class of HTML <table>. By default, "header" (i.e. <table class="term". CSS includes "bullet"', 'table')
  .description("Convert CSV data to a <dl> and save to an HTML file export directory. If outputFile is unspecified, exports to './export/dl/<inputFile>.html'.")
  .configureHelp({
    sortSubcommands: true, 
    sortOptions: true
  })
  .action((inputFile, options, command) => {
    console.log('Program Executed');
    //console.log('\nWrite Options to Screen:');
    //console.log(JSON.stringify(options, null, 2));
    //console.log(options.outputFile);
    // Identify the command run
    //console.log('Called %s with options %o')
    //console.log('What is this? Its undefined');
    //console.log(command.inputFile);
    //console.log('\nWrite Arguments to Screen:');
    //console.log(program.args);
    userCommand = program.args[0];
    //console.log('\nWrite InputFile to Screen');
    //console.log(userCommand);
    //console.log('\nWrite Options to Screen Using Function');
    //This is the problem; program.opts().outputFile is incorrect?
    //let defaultOutput = program.opts().outputFile;
    let defaultOutput = options.outputFile;
    //console.log('\nWrite default output:');
    //console.log(options.outputFile);
    //console.log(defaultOutput);
    let inputFileName = getFilename(inputFile);
    newOutPutPath = createOutputPath(inputFileName, userCommand, defaultOutput);
    console.log(`This is the command: ${inputFile}`);
    dl_parse(inputFile, newOutPutPath,options);

  });

  program
  .command("tables")
  .argument("<inputFile>", "Specify a path to a flatfile. For example, 'data.csv'")
  .option('-o, --outputFile [value]', 'option with a default value', 'defaultPath')
  .option("-b --browser", "Serve HTML to browser using specified CSS")
  .option("-C, --skipComments", "Ignore commented lines in inputFile. Commented lines begin with the '#' character.")
  .option("-d, --delimiter <character>", "Identify the delimiter in the InputFile. One of ',' (comma), ';' (semi-colon), or '|' (pipe). If unspecified, ','")
  .option("-e, --excludeHeader", "Exclude the first row in the inputFile. First row is included by default. Use 'noHeader' CSS style if specified.")
  .option("-L, --skipLines <number>", "Skip the specified number of lines at the begining of inputFile")
  .option("-n, --includeColumns [columnNumber...]", "Specify data columns to include in the table. For example, [1,2,5,7]. Maximum of five columns.  By default, first five columns are returned")
  //.option("-o, --output <outputFile>", "Write <table> to specified path. If unspecified, output file is saved to 'output/tables/<inputName>.html'")

  .option("-p, --pretty", "Pretty-print converted data to the Terminal")
  .option("-r, --replaceHeaders [columnName...]", "Replace InputFile column headers with desired table column headers. Specify an array of comma-separated headers.")
  //.option("-s, --style <class>", "Specify CSS class of HTML <table>. By default, 'header' (i.e. <table class='term'. CSS includes 'noHeader'")
  .option('-p --preview', 'Serve HTML to browser using specified CSS', false)
  .option('-sk, --skipComments', 'Ignore commented lines in inputFile. Commented lines begin with the "#" character.', false)
  .option('-d, --delimiter <value>', 'identify the delimiter in the InputFile. For example, ";" (semi-colon), or "|" (pipe)', ',')
  //.option('-d, --delimiter <character>', 'Identify the delimiter in the InputFile. One of ',' (comma), ";" (semi-colon), or '|' (pipe). If unspecified, ","', '","')
  .option('-e, --excludeHeader', 'Exclude the first row in the inputFile. First row is included by default. Use "noHeader" CSS style if specified.', false)
  .option("-sl, --skipLines <number>", "Skip the specified number of lines at the begining of inputFile")
  .option('-n, --includeColumns [columnNumber...]', 'Specify data columns to include in the table. For example, [1,2,5,7]. Maximum of five columns.  By default, first five columns are returned')
  //.option('-p, --pretty', 'Pretty-print converted data to the Terminal', false)
  .option('-r, --replaceHeaders [columnName...]', 'Replace InputFile column headers with desired table column headers. Specify an array of comma-separated headers.')
  .option('-c, --css <class>', 'Specify CSS class of HTML <table>. By default, "header" (i.e. <table class="term". CSS includes "noHeader"', 'header')
  //.option('-n, --includeColumns [columnNumber...]', 'Specify data columns to include in the table. For example, [1,2,5,7]. Maximum of five columns.  By default, first five columns are returned')
  //.option('-r, --replaceHeaders [columnName...]', 'Replace InputFile column headers with desired table column headers. Specify an array of comma-separated headers.')
  .description(
    "Convert flatfile data to a <dl> HTML element and save to file. If outputFile is unspecified, exports to './export/table/<inputFile>.html'."
  )
  .configureHelp({
    sortSubcommands: true, 
    sortOptions: true
  })
  .action((tables) => {
    console.log('program executed');

    userCommand = program.args[0];
    let defaultOutput = options.outputFile;
    let inputFileName = getFilename(inputFile);
    newOutPutPath = createOutputPath(inputFileName, userCommand, defaultOutput);
    table_parse(inputFile, newOutPutPath,options);
  });

  program
  .command("convert")
  .argument("<inputFile>", "Specifies path to flatfile. For example, data.csv")
  .option("-d, --delimiter", "Converts existing column delimiter to specfied delimiting character. One of ',' (comma), ';' (semi-colon), or '|' (pipe). If unspecified, '|'")
  .description(
    "Replace column delmiter in inputFile with the specified delimiter. Updates InputFile."
  )
  .configureHelp({
    sortSubcommands: true, 
    sortOptions: true
  })
  .action((convert) => {
    console.log('program executed');
    logProgramOptions(program);
  });

  program
  .command("info")
  .argument("<inputFile>", "Specifies path to flatfile. For example, data.csv")
  .description(
    "Returns information about the specified flat file including the number of columns, number of rows, and the delimiter used."
  )
  .configureHelp({
    sortSubcommands: true, 
    sortOptions: true
  })
  .action((info) => {
    console.log('program executed');
    logProgramOptions(program);
  });

program.parse();
