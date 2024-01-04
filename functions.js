/**
 * Functions for use on the wishlist site.
 * @author Bilgecrank
 */

const scriptUrl = 'https://script.google.com/macros/s/AKfycbz1fiXhKFRGsnIu20nHKKHMocfx1Nar4f7QW7ro83nMMkQuttbEyidberYtaB87aCWp/exec';

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
        document.getElementById('submissionForm').style.display = 'none';
        document.getElementById('loadingTrooper').style.display = 'block'; 
        let response = await fetch(scriptUrl, {
            method: 'POST',
            credentials: 'omit',
            body: new FormData(submissionForm)
        });
        alert(await response.json());
        document.getElementById('loadingTrooper').style.display = 'none';         
        document.getElementById('submissionForm').reset();
        document.getElementById('openSubFormButton').style.display = 'block';
        grabData(); //Reload with new data. @todo set function to show loading data.
    };

function buildTables(tableData) {
    /**
     * Build tables with item objects retrieved from @function grabData()
     *
     * @param {obj} tableData
     */

    for (let table in tableData){
        let inputData = tableData[table];
        let headers = [
            'QTY',
            'Item',
            'Description',
            'Link'
        ];
        let rawHTML = '<table border="1">';
        rawHTML += '<tr>'; //Build headers.
        for (i = 0; i < headers.length; i++) {
            rawHTML += '<th>' + headers[i] + '</th>';
        }
        rawHTML += '</tr>'; //End headers, start data.
        for (let x in inputData){
            rawHTML += '<tr>';
            rawHTML += '<td>' + inputData[x].quantity + '</td>';    //QTY
            rawHTML += '<td>' + inputData[x].item + '</td>';        //Iten
            rawHTML += '<td>' + inputData[x].description + '</td>'; //Description
            rawHTML += '<td>' + inputData[x].item_link + '</td>';   //Link
            rawHTML += '</tr>';
        }
        rawHTML += '</table>';
        document.getElementById(table).innerHTML = rawHTML;
    }
}

function openSubmissionForm() {
    document.getElementById('submissionForm').style.display = 'block';
    document.getElementById('openSubFormButton').style.display = 'none';
}
