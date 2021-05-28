//var PdfPrinter = require('pdfmake');
var fs = require('fs');
const PDFDocument = require('pdfkit');

var PathToPDF;
if (process.platform == "win32") {
    PathToPDF = __dirname.replace("services", "FilesToDownload\\Statistics.pdf");
} else {
    PathToPDF = __dirname.replace("services", "FilesToDownload/Statistics.pdf");
}
let pdfDoc = new PDFDocument();
pdfDoc.pipe(fs.createWriteStream(PathToPDF));
pdfDoc.font('Courier-Bold').fontSize(18).fillColor('black').text("IMPORTANT STATISTICS", { align: 'center'});

pdfDoc.image('chart.png', 50, 100, { width: 500, height: 320 });
pdfDoc.image('chart2.png', 50, 440, { width: 500, height: 320 });
pdfDoc.addPage();     
pdfDoc.image('chart3.png', 50,  50, { width: 500, height: 320 });
pdfDoc.image('chart4.png', 50,  400, { width: 500, height: 320 });
pdfDoc.addPage();
pdfDoc.image('chart5.png', 50,  50, { width: 500, height: 320 });
pdfDoc.image('chart6.png', 50,  400, { width: 500, height: 320 });
pdfDoc.end();