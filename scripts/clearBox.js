const array = Array();
const dates = Array();
const inputDate = Array();


function clearBox(elementID) {
    document.getElementById(elementID).innerHTML = "";
    document.getElementById("cleanList").style.display = "none";
}

function isEmpty(str) {
    return (str == null) || (str.length === 0);
}
function checkAmount(amount) {
    return Number.isInteger(amount);
}

function checkCurrency(currency) {
    return currency === "USD"  || currency === "EUR"  || currency === "PLN";
}

function checkDate(date) {
    return !isNaN(date.getFullYear())
}

function checkInput(amount, currency, date){
    return checkAmount(amount) && checkCurrency(currency) && checkDate(date)
}

function showListOfExpenses(){
    document.getElementById("totalCurrency").style.display = "none";
    document.getElementById("div1").style.display = "block";
    document.getElementById("div1").innerHTML = array.join('<br>');
    document.getElementById("cleanList").style.display = "block";
    document.getElementById("invalidInput").style.display = "none";
}

function deleteFromArray(arrToDelete) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === arrToDelete) {
            array.splice(i, 1);
        }
    }
}



function isCommand() {
    var str = document.getElementById("command").value;
    var firstWord = str.replace(/ .*/, '');

    console.log(firstWord)
    if (isEmpty(str)) {
        alert("Empty line");

    } else if (firstWord === "add") {
        console.log(str)
        document.getElementById("invalidInput").style.display = "none";
        let result = str.substr(str.indexOf(" ") + 1);
        let resultSplit = result.split(" ");
        console.log(resultSplit[1])
        let amount = +resultSplit[1]
        var date = new Date(resultSplit[0])
        console.log(date.getFullYear())
        if (checkInput(amount, resultSplit[2], date)) {
            array.push(resultSplit)
            dates.push([date.getFullYear(), date.getMonth() + 1, date.getDate()])
        } else {
            alert("Invalid input, please read the commands structure below")
        }
        console.log(array)
    }
    else if(str === "list"){
        showListOfExpenses()
    }
    else if (firstWord === "clear") {
        if(array.length === 0) {
            alert("The is no values")
        }else {
            var dateToClean = str.substr(str.indexOf(" ") + 1);
            dateToCleanaArray = dateToClean.split(" ");
            console.log(dateToCleanaArray)
            console.log(array)
            array.forEach(function(item, i, array){
                if(item[0] === dateToCleanaArray[0]) {
                    console.log("Заєбісь")
                    deleteFromArray(item)
                    console.log(array)
                }
                console.log(array)
                inputDate.push(item[0])
            });
        }
    }else if(firstWord === "total"){
        var totalMoney = 0;
        var currencyToConvert = str.substr(str.indexOf(" ") + 1);
        if(checkCurrency(currencyToConvert)){
            array.forEach(function(item, i, array){
                if(item[2] === currencyToConvert) {
                    totalMoney +=  Number(item[1])
                }
                else if(item[2] === "EUR"){
                    if(currencyToConvert === "USD"){
                        const EUR_TO_USD = 1.188615;
                        console.log(Number(item[1]), typeof Number(item[1]))
                        console.log(EUR_TO_USD, typeof EUR_TO_USD)
                        totalMoney += Number(item[1]) * EUR_TO_USD;
                    }
                    if(currencyToConvert === "PLN"){
                        const EUR_TO_PLN = 4.620858;
                        totalMoney += Number(item[1]) * EUR_TO_PLN;}
                }
                else if(item[2] === "USD"){
                    if(currencyToConvert === "EUR"){
                        const USD_TO_EUR = 0.84;
                        console.log(Number(item[1]), typeof Number(item[1]))
                        console.log(USD_TO_EUR, typeof USD_TO_EUR)
                        totalMoney += Number(item[1]) * USD_TO_EUR;
                    }
                    if(currencyToConvert === "PLN"){
                        const USD_TO_PLN = 3.89;
                        totalMoney += Number(item[1]) * USD_TO_PLN;
                    }
                }
                else if(item[2] === "PLN"){
                    if(currencyToConvert === "EUR"){
                        const PLN_TO_EUR = 0.22;
                        console.log(Number(item[1]), typeof Number(item[1]))
                        console.log(PLN_TO_EUR, typeof PLN_TO_EUR)
                        totalMoney += Number(item[1]) * PLN_TO_EUR;
                    }
                    if(currencyToConvert === "USD"){
                        const PLN_TO_USD = 0.26;
                        totalMoney += Number(item[1]) * PLN_TO_USD;
                    }
                }
            })
        }
        if(checkCurrency(currencyToConvert)){
        const messageAboutTotalCurrencyAmount = `Total currency amount = ${totalMoney} ${currencyToConvert}`;
        document.getElementById("totalCurrency").style.display = "block";
        document.getElementById("totalCurrency").innerHTML = messageAboutTotalCurrencyAmount;
        } else {
            alert("Invalid input, please read the commands structure below")
        }

    }
    else if (firstWord !== "add" && firstWord !== "list" && firstWord !== "total" && firstWord !== "clear" ){
        document.getElementById("invalidInput").style.display = "block";
    }else {
        document.getElementById("invalidInput").style.display = "block";
    }
}


