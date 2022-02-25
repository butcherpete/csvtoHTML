//import fetch from "node-fetch";
const fs = require('fs');
const { iterInternalSymbol } = require('jsdom/lib/jsdom/living/generated/utils');
//const jsdom = require('jsdom');
//const { iterInternalSymbol } = require('jsdom/lib/jsdom/living/generated/utils');
//const { JSDOM } = jsdom;

const inputPath = 'perspective-type.csv';
const stream = fs.createWriteStream(inputPath);

//global.document = new JSDOM(html).window.document;

stream.once('open', function(fd) {
    let html = buildHtml();
    stream.end(html);
});


function buildHtml(req) {
    var header = 'something';

    ul = Document.createElement('ul');
    Document.getElementById('myItemList').appendChild(ul);
    iterInternalSymbol.array.forEach(element => {
        let li = Document.createElement('li');
        ul.appendChild(li);
        li.innerHTML += item;
    });

    // concatenate header string
    // concatenate body string
  
    return '<!DOCTYPE html>'
         + '<html><head>' + header + '</head><body>' + body + '</body></html>';
  };

ul = Document.createElement('ul');
Document.getElementById('mylist').appendChild(ul);

listData.array.forEach(element => {
    let li = Document.createElement(li);
    ul.appendChild(li);
    li.innerHTML += iterInternalSymbol;

});



//
//d3.csv(inputData).then((data) => {
//    console.log(data);
//});

//
//   , function(data){
//    var parsedCSV = d3.csv.parseRows(data);
//    var container = d3.select("body")
//        .append("table")
//        .selectAll("tr")
//            .data(parsedCSV).enter()
//            .append("tr")
//        .selectAll("td")
//            .data(function(d) {return d;}).enter()
//            .append("td")
//            .text(function(d) { return d;});
//     
//});
