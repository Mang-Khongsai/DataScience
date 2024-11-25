function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for (var i = 0; i < uiBathrooms.length; i++) {
        if (uiBathrooms[i].checked) {
            return parseInt(uiBathrooms[i].value); // Use the value of the checked radio button
        }
    }
    return -1; // Invalid Value
}

function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for (var i = 0; i < uiBHK.length; i++) {
        if (uiBHK[i].checked) {
            return parseInt(uiBHK[i].value); // Use the value of the checked radio button
        }
    }
    return -1; // Invalid Value
}

function onClickedEstimatePrice(event) {
    event.preventDefault(); // Prevent form submission

    console.log("Estimate price button clicked");

    // Get user input values
    var sqft = document.getElementById("uiSqft").value; // Fetch the square feet value
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations").value; // Fetch selected location
    var estPrice = document.getElementById("uiEstimatedPrice");

    // Check if values are valid
    if (sqft <= 0 || bhk <= 0 || bathrooms <= 0 || !location) {
        estPrice.innerHTML = "<h2>Invalid input values</h2>";
        return;
    }

    var url = "http://127.0.0.1:5000/predict_home_price"; // Flask server URL

    // Sending values to the server via POST request
    $.ajax({
        url: url,
        type: "POST",
        data: {
            total_sqft: parseFloat(sqft),
            bhk: bhk,
            bath: bathrooms,
            location: location
        },
        success: function(data, status) {
            console.log("Response from server: ", data);
            if (data && data.estimated_price) {
                estPrice.innerHTML = "<h2>" + data.estimated_price + " Lakh</h2>";
            } else {
                estPrice.innerHTML = "<h2>Could not estimate price</h2>";
            }
        },
        error: function(xhr, status, error) {
            console.log("Error while fetching data:", error);
            estPrice.innerHTML = "<h2>Error while fetching data</h2>";
        }
    });
}

function onPageLoad() {
    console.log("document loaded");
    var url = "http://127.0.0.1:5000/get_location_names"; // Flask server URL

    // Fetching location names from the server
    $.get(url, function(data, status) {
        console.log("Got response for get_location_names request");
        if (data && data.locations) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty(); // Clear existing options
            // Populate the location dropdown with options
            for (var i = 0; i < locations.length; i++) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    }).fail(function() {
        console.log("Error fetching location names");
    });
}

window.onload = onPageLoad;
