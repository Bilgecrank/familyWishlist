/**
 * Functions for use on the wishlist site.
 * @author Bilgecrank
 */

const scriptUrl = 'https://script.google.com/macros/s/AKfycby5fzI9r6I3DDKWvKyYJ-EOmoyu0WrOyuu15RpucxHYWBZ4gLKviWYSUfwP5xCZ5Hq3/exec';

grabData();

async function grabData() {
    /**
     * Send request receive data from google sheet and then assemble the tables.
     */
    let response = await fetch(scriptUrl + '?sheetType=family', {
        method: 'GET',
        credentials: 'omit'
    });
    var result = await response.json();
    buildTables(result);
};

submissionForm.onsubmit = 
    async function sendData(e) {
        /**
         * Simulates form submission without causing a redirect.
         */
        e.preventDefault();
        let response = await fetch(scriptUrl, {
            method: 'POST',
            credentials: 'omit',
            body: new FormData(submissionForm)
        });
        alert(await response.json());
        document.getElementById('submissionForm').reset();
    };

function buildTables(tableData) {
    /**
     * Build tables with item objects retrieved from @function grabData()
     *
     * @param {obj} tableData
     */

    for (let table in tableData){
        let inputData = tableData[table];
        let headers = Object.keys(inputData[0]);
        let rawHTML = '<table border="1">';
        rawHTML += '<tr>'; //Build headers.
        for (i = 2; i < headers.length; i++) {
            rawHTML += '<th>' + headers[i] + '</th>';
        }
        rawHTML += '</tr>';//End headers, start data.
        for (let x in inputData){
            rawHTML += '<tr>';
            rawHTML += '<td>' + inputData[x].item + '</td>';
            rawHTML += '<td>' + inputData[x].description + '</td>';
            rawHTML += '</tr>';
        }
        rawHTML += '</table>';
        document.getElementById(table).innerHTML = rawHTML;
    }
}


