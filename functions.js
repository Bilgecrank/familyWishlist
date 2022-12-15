/*
 * Functions for use on the wishlist site.
 */

const scriptUrl = 'https://script.google.com/macros/s/AKfycbwdQwVNGcTptTY-IQqAur5NbOI_KkfB7PKMosPaBDo/dev';

function grabData() {
    let response = fetch(scriptUrl + '?sheetType=family', {
        method: 'GET'
    });
    if (response.ok) {
        console.log(response.text);
    } else {
        console.log('Error:' + response.text);
    }
};
