/**
 * Uses AJAX to query an internet data source for zip codes
 * @param {string} zipId The element id that has the zip code
 */
function findZip(zipId) {
    var zip = document.getElementById(zipId).value;
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            if(this.status === 200) {
                displayPlace(this.responseText);
            } else if (this.status === 404){
                displayPlace('{ "country" : "none" }');
            } else {
                console.log("We have a problem...server responded with code: " + this.status);
            }
        } else {

        }
    };
    var url = "http://api.fixer.io/latest" + zip;
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

/**
 * Displays the zip code place given the JSON data
 * @param {string} data JSON data representing place for given zip code
 */
function displayPlace(data){
    var place = JSON.parse(data);
    if(place.country === "none") {
        document.getElementById("place").className = "alert alert-warning";
        document.getElementById("place").innerHTML = "No place matches that zip code."
    } else {
        document.getElementById("place").className = "alert alert-success";
        document.getElementById("place").innerHTML = place.places[0]["place name"] +
        ", " +
        place.places[0].state +
        ", " +
        place.country;
    }
}
