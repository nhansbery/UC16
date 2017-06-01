/**
 * Uses AJAX to query an internet data source for number facts
 * @param {string} numberId The element id that has the number fact
 */
function findFact() {
    var numero = document.getElementById("number").value;
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            if(this.status === 200) {
                console.log("Successful Request!!")
                displayFact(this.responseText);
            } else if (this.status === 404){
                displayFact('{ "number" : "none" }');
            } else {
                console.log("We have a problem...server responded with code: " + this.status);
            }
        } else {

        }
    };
    var url = "http://numbersapi.com/" + numero + "/" + "math?JSON";
    httpRequest.open("GET", url, true);
    httpRequest.send();

}

/**
 * Displays the number fact
 * @param {string} data JSON data representing place for given number
 */

function displayFact(data){
    var numfact = data;
    if(numfact.text === "none") {
        document.getElementById("output").className = "alert alert-warning";
        document.getElementById("output").innerHTML = "No numbers match your entry."
    } else {
        document.getElementById("output").className = "alert alert-success";
        document.getElementById("output").innerHTML = document.write(data);

    }
}
