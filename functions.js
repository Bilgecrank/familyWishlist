/*
 * Functions for use on the wishlist site.
 */

const scriptUrl = 'https://script.google.com/macros/s/AKfycbzl-bEITgeN-HigNswlNkleRi21SGV9EPkwm4tI7ZA0Jv7bw0yrjCDWfKkI0GeW7I1a/exec';

grabData();

async function grabData() {
    let response = await fetch(scriptUrl + '?sheetType=family', {
        method: 'GET'
    });
    var result = await response.json();
    console.log(result);
    buildTables(result);
};

function buildTables(tableData) {
    let headers = Object.keys(tableData[0]);
    let rawHTML = '<table border="1">';
    rawHTML += '<tr>'; //Build headers.
    for (i = 2; i < headers.length; i++) {
        rawHTML += '<th>' + headers[i] + '</th>';
    }
    rawHTML += '</tr>';//End headers, start data.
    for (let x in tableData){
        rawHTML += '<tr>';
        rawHTML += '<td>' + tableData[x].item + '</td>';
        rawHTML += '<td>' + tableData[x].description + '</td>';
        rawHTML += '</tr>';
    }
    rawHTML += '</table>';
    document.getElementById('buildATable').innerHTML = rawHTML;
}


