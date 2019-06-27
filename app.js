var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
var url = "https://api.random.org/json-rpc/2/invoke";

xhr.open("POST", url, true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {

        var json = JSON.parse(xhr.responseText);
        countZerosAndOnes(json.result.random.data);

    } else if (xhr.status!==200){
        console.log("Something has gone wrong. HTTP status: " + xhr.status + "| "+xhr.statusText);
    }
};
const data = JSON.stringify(
    {
        "jsonrpc": "2.0",
        "method": "generateIntegers",
        "params": {
            "apiKey": "313f4bd5-3f97-4139-aeb5-bbb54b6b8ab7",
            "n": 10000,
            "min": 0,
            "max": 1,
            "replacement": true,
            "base": 10
        },
        "id": 9984
    }
);
xhr.send(data);

function countZerosAndOnes(arrayFromResponse){
    let zeros=0, ones=0, doubles=0, triples=0;
    for(let i in arrayFromResponse) {
        if (arrayFromResponse[i] === 0) {
            zeros++;
        } else if (arrayFromResponse[i] === 1) {
            ones++;
        }
    }
    let percentRatioForZeros = ((zeros/arrayFromResponse.length)*100).toFixed(2);
    let percentRatioForOnes = ((ones/arrayFromResponse.length)*100).toFixed(2);

    for(let i=0; i<(arrayFromResponse.length-1); i++){
        let first = arrayFromResponse[i];
        if(arrayFromResponse[i+1] === first) {
            doubles++;
            i++;
        }
    }

    for(let i=0; i<(arrayFromResponse.length-2); i++){
        let first = arrayFromResponse[i];
		if(arrayFromResponse[i+1] === first && arrayFromResponse[i+2]===first){
		    triples++;
		    i=i+2;
		}
	}
    console.log("Количество нулей: "+zeros + "\nКоличество единиц: " + ones + "\nПроцентное соотношение: " + "% нулей = " + percentRatioForZeros + " | % единиц = "+percentRatioForOnes);
    console.log("\nКоличество пар одинаковых цифр: "+doubles+"\nКоличество троек одинаковых цифр: "+triples);
}
