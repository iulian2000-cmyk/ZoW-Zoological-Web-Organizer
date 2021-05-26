const ChartJsImage = require('chartjs-to-image');
var mysql = require('mysql');
var PdfPrinter = require('pdfmake');
var fs = require('fs');

var SQL_interogation;

if (process.platform == "win32") {
    SQL_interogation = "SELECT AVG(longevitate) AS \"Medie_viata\"," +
        "(SELECT COUNT(*) FROM animals WHERE TRIM(cardCategorie) = \"Mamifere\") AS \"Numar_mamifere\"," +
        "(SELECT COUNT(*) FROM animals WHERE insecta = 1) AS \"Numar_insecte\", " +
        "(SELECT COUNT(*) FROM animals WHERE terestru = 1) AS \"Numar_animale_terestre\"," +
        "(SELECT COUNT(*) FROM animals WHERE acvatic = 1) AS \"Numar_animale_acvatice\"," +
        "(SELECT COUNT(*) FROM animals WHERE aerian = 1) AS \"Numar_animale_aeriane\"," +
        "(SELECT COUNT(*) FROM animals WHERE domestic = 1) AS \"Numar_animale_domestice\"," +
        "(SELECT COUNT(*) FROM animals WHERE TRIM(cardModDeHranire) = \"erbivor\") AS \"Numar_animale_erbivore\"," +
        "(SELECT COUNT(*) FROM animals WHERE TRIM(cardModDeHranire) = \"carnivor\") AS \"Numar_animale_carnivore\"," +
        "(SELECT COUNT(*) FROM animals WHERE TRIM(cardModDeHranire) = \"omnivor\") AS \"Numar_animale_omnivore\"," +
        "(SELECT COUNT(*) FROM animals WHERE TRIM(cardModDeHranire) = \"parazitar\") AS \"Numar_animale_parazitare\"," +
        "(SELECT AVG(longevitate) FROM animals WHERE TRIM(cardCategorie) = \"Mamifere\") AS \"Medie_viata_mamifere\" ," +
        "(SELECT AVG(longevitate) FROM animals WHERE TRIM(cardCategorie) = \"Pasari\") AS \"Medie_viata_pasari\" ," +
        "(SELECT AVG(longevitate) FROM animals WHERE TRIM(cardCategorie) = \"Insecte\") AS \"Medie_viata_insecte\" ," +
        "(SELECT AVG(longevitate) FROM animals WHERE TRIM(cardCategorie) = \"Reptile\") AS \"Medie_viata_reptile\" ," +
        "(SELECT AVG(longevitate) FROM animals WHERE TRIM(cardCategorie) = \"Dinozauri\") AS \"Medie_viata_dinozauri\" ," +
        "(SELECT AVG(longevitate) FROM animals WHERE TRIM(cardCategorie) = \"Pesti\") AS \"Medie_viata_pesti\" ," +
        "(SELECT COUNT( * ) FROM animals WHERE salbatic = 1) AS \"Numar_animale_salbatice\" FROM animals;";
} else {
    SQL_interogation = "SELECT AVG(longevitate) AS \"Medie_viata\",(SELECT COUNT(*) FROM animals WHERE TRIM(cardCategorie) = \"Mamifere\") AS \"Numar_mamifere\",(SELECT COUNT(*) FROM animals WHERE insecta = 1) AS \"Numar_insecte\",(SELECT COUNT(*) FROM animals WHERE terestru = 1) AS \"Numar_animale_terestre\",(SELECT COUNT(*) FROM animals WHERE acvatic = 1) AS \"Numar_animale_acvatice\",(SELECT COUNT(*) FROM animals WHERE aerian = 1) AS \"Numar_animale_aeriane\",(SELECT COUNT(*) FROM animals WHERE domestic = 1) AS \"Numar_animale_domestice\",(SELECT COUNT(*) FROM animals WHERE TRIM(cardModDeHranire) = \"erbivor\") AS \"Numar_animale_erbivore\",(SELECT COUNT(*) FROM animals WHERE TRIM(cardModDeHranire) = \"carnivor\") AS \"Numar_animale_carnivore\",(SELECT COUNT(*) FROM animals WHERE TRIM(cardModDeHranire) = \"omnivor\") AS \"Numar_animale_omnivore\",(SELECT COUNT(*) FROM animals WHERE TRIM(cardModDeHranire) = \"parazitar\") AS \"Numar_animale_parazitare\",(SELECT AVG(longevitate) FROM animals WHERE TRIM(cardCategorie) = \"Mamifere\") AS \"Medie_viata_mamifere\" ,(SELECT AVG(longevitate) FROM animals WHERE TRIM(cardCategorie) = \"Pasari\") AS \"Medie_viata_pasari\" ,(SELECT AVG(longevitate) FROM animals WHERE TRIM(cardCategorie) = \"Insecte\") AS \"Medie_viata_insecte\" ,(SELECT AVG(longevitate) FROM animals WHERE TRIM(cardCategorie) = \"Reptile\") AS \"Medie_viata_reptile\" ,(SELECT AVG(longevitate) FROM animals WHERE TRIM(cardCategorie) = \"Dinozauri\") AS \"Medie_viata_dinozauri\" ,(SELECT AVG(longevitate) FROM animals WHERE TRIM(cardCategorie) = \"Pesti\") AS \"Medie_viata_pesti\" ,(SELECT COUNT(*) FROM animals WHERE salbatic = 1) AS \"Numar_animale_salbatice\" FROM animals;";
}


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'Zow_Atlas'
});

var PathToCHART;
if (process.platform == "win32") {
    PathToCHART = __dirname.replace("services", "FilesToDownload\\Statistics.pdf");
} else {
    PathToCHART = __dirname.replace("services", "FilesToDownload/Statistics.pdf");
}

connection.query({ sql: SQL_interogation, timeout: 1000 }, function(error, results, fields) {
    const chart = new ChartJsImage();

    chart.setConfig({
        type: 'doughnut',
        data: {
            labels: ['Animale domestice', 'Animale salbatice'],
            datasets: [{
                label: 'Situatie animale domestice si salbatice',
                data: [results[0].Numar_animale_domestice, results[0].Numar_animale_salbatice]
            }]
        },
    });


    chart.setBackgroundColor("transparent");
    chart.toFile('chart.png');
    chart.setConfig({
        type: 'doughnut',
        data: {
            labels: ['Animale acvatice', 'Animale aeriene', 'Animale terestre'],
            datasets: [{
                label: 'Situatie animale terestre/acvatice/aeriene',
                data: [results[0].Numar_animale_carnivore, results[0].Numar_animale_aeriane, results[0].Numar_animale_terestre]
            }]
        },
    });

    chart.setBackgroundColor("transparent");

    chart.toFile('chart2.png');

    chart.setConfig({
        type: 'doughnut',
        data: {
            labels: ['Animale carnivore', 'Animale erbivore', 'Animale omnivore', 'Animale parazitare'],
            datasets: [{
                label: 'Modul de hranire al animalelor',
                data: [results[0].Numar_animale_acvatice, results[0].Numar_animale_erbivore, results[0].Numar_animale_omnivore, results[0].Numar_animale_parazitare]
            }]
        },
    });

    chart.setBackgroundColor("transparent");
    chart.toFile('chart3.png');

    chart.setConfig({
        type: 'bar',
        data: {
            labels: ['Mamifere', 'Pasari', 'Reptile', 'Dinozauri', 'Insecte', 'Pesti'],
            datasets: [{
                label: 'Durata medie de viata a animalelor( nr. de luni )',
                data: [results[0].Medie_viata_mamifere, results[0].Medie_viata_pasari, results[0].Medie_viata_reptile, results[0].Medie_viata_dinozauri, results[0].Medie_viata_insecte, results[0].Medie_viata_pesti]
            }]
        },
    });

    chart.setBackgroundColor("transparent");
    chart.toFile('chart4.png');
    connection.destroy();

});