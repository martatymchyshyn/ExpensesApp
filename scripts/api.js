const urlForGettingRates =  'http://data.fixer.io/api/latest?access_key=8a39b526a320f66c98e069c14e7ed57d&format=1';
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const ratesForEur = getCurrencyRate();
const usdRate = ratesForEur.USD;
console.log(usdRate);
const plnRate = ratesForEur.PLN;
console.log(plnRate)


function getCurrencyRate() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", urlForGettingRates, false); // false for synchronous request
    xmlHttp.send(null);

    var json = JSON.parse(xmlHttp.responseText);
    return getConversionResult(json)
}

function getConversionResult(json) {
    return json["rates"];
}