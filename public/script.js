// API Authorization Info
const baseUrl = "https://developer.nps.gov/api/v1/parks";
const options = {
	headers: {
		"X-Api-Key": "2K8PxIYVtjPVebm0e1atMb2v51yPETTiL4k6WalB"
	}
};

// Initial DOM Variables
let stateDiv = document.getElementById("state");
let stateList = document.getElementById("stateList");
let parkDiv = document.getElementById("park");
let parkList = document.getElementById("parkList");
let parkInfo = document.getElementById("parkInfo")
let parkName = document.getElementById("parkName");
let parkDesc = document.getElementById("parkDesc");
let parkWeather = document.getElementById("parkWeather");
let parkAddress = document.getElementById("parkAddress");
let parkDirections = document.getElementById("parkDirections");
let parkActivities = document.getElementById("parkActivities");
let parkImages = document.getElementById("carousel-inner");
let indicators = document.getElementById("carousel-indicators")
let googleMapsLink = document.getElementById("googleMapsLink")

// Visibility
parkDiv.style.display = "none";
parkInfo.style.display = "none";

// Event Listeners
stateList.addEventListener("change", fetchParks);
parkList.addEventListener("change", fetchResults);

// State Array
var usStates = [
    { name: 'ALABAMA', stateCode: 'AL'},
    { name: 'ALASKA', stateCode: 'AK'},
    { name: 'ARIZONA', stateCode: 'AZ'},
    { name: 'ARKANSAS', stateCode: 'AR'},
    { name: 'CALIFORNIA', stateCode: 'CA'},
    { name: 'COLORADO', stateCode: 'CO'},
    { name: 'CONNECTICUT', stateCode: 'CT'},
    { name: 'DELAWARE', stateCode: 'DE'},
    { name: 'FLORIDA', stateCode: 'FL'},
    { name: 'GEORGIA', stateCode: 'GA'},
    { name: 'HAWAII', stateCode: 'HI'},
    { name: 'IDAHO', stateCode: 'ID'},
    { name: 'ILLINOIS', stateCode: 'IL'},
    { name: 'INDIANA', stateCode: 'IN'},
    { name: 'IOWA', stateCode: 'IA'},
    { name: 'KANSAS', stateCode: 'KS'},
    { name: 'KENTUCKY', stateCode: 'KY'},
    { name: 'LOUISIANA', stateCode: 'LA'},
    { name: 'MAINE', stateCode: 'ME'},
    { name: 'MARYLAND', stateCode: 'MD'},
    { name: 'MASSACHUSETTS', stateCode: 'MA'},
    { name: 'MICHIGAN', stateCode: 'MI'},
    { name: 'MINNESOTA', stateCode: 'MN'},
    { name: 'MISSISSIPPI', stateCode: 'MS'},
    { name: 'MISSOURI', stateCode: 'MO'},
    { name: 'MONTANA', stateCode: 'MT'},
    { name: 'NEBRASKA', stateCode: 'NE'},
    { name: 'NEVADA', stateCode: 'NV'},
    { name: 'NEW HAMPSHIRE', stateCode: 'NH'},
    { name: 'NEW JERSEY', stateCode: 'NJ'},
    { name: 'NEW MEXICO', stateCode: 'NM'},
    { name: 'NEW YORK', stateCode: 'NY'},
    { name: 'NORTH CAROLINA', stateCode: 'NC'},
    { name: 'NORTH DAKOTA', stateCode: 'ND'},
    { name: 'OHIO', stateCode: 'OH'},
    { name: 'OKLAHOMA', stateCode: 'OK'},
    { name: 'OREGON', stateCode: 'OR'},
    { name: 'PENNSYLVANIA', stateCode: 'PA'},
    { name: 'RHODE ISLAND', stateCode: 'RI'},
    { name: 'SOUTH CAROLINA', stateCode: 'SC'},
    { name: 'SOUTH DAKOTA', stateCode: 'SD'},
    { name: 'TENNESSEE', stateCode: 'TN'},
    { name: 'TEXAS', stateCode: 'TX'},
    { name: 'UTAH', stateCode: 'UT'},
    { name: 'VERMONT', stateCode: 'VT'},
    { name: 'VIRGINIA', stateCode: 'VA'},
    { name: 'WASHINGTON', stateCode: 'WA'},
    { name: 'WEST VIRGINIA', stateCode: 'WV'},
    { name: 'WISCONSIN', stateCode: 'WI'},
    { name: 'WYOMING', stateCode: 'WY' }
];

// State List Dropdown Population
for(let j = 0; j < usStates.length; j++) {
    let state = document.createElement("option");
    state.innerHTML = usStates[j].name;
    state.value = usStates[j].stateCode;
    stateList.appendChild(state);
    state.setAttribute("class", "dropdown-item")
}

// Park Fetch Request Function, based on selected state filter
function fetchParks() {
	let stateUrl = baseUrl + "?stateCode=" + stateList.value;

    // Wipe existing Park List before building a new one
	while(parkList.firstChild) {
		parkList.removeChild(parkList.firstChild);
	};

    // Set the default selected option to a hidden/disabled element - forcing a park choice to be made
        let defaultPark = document.createElement("option");
        parkList.appendChild(defaultPark);
        defaultPark.setAttribute("value", "");
        defaultPark.setAttribute("selected", "");
        defaultPark.setAttribute("disabled", "");
        defaultPark.setAttribute("hidden", "");
        defaultPark.setAttribute("required", "");
        defaultPark.innerHTML = "--Choose Park--"

    // Get the filtered park list and send them to the Display function
    fetch(stateUrl, options)
        .then(function(results) {
            return results.json();
        })
        .then(function(data) {
            displayParks(data.data);
        });
};



// Park Dropdown Population, based on selected state filter
function displayParks(data) {	
	park.style.display = "block";

	for(let i = 0; i < data.length; i++) {
		let park = document.createElement("option");
		parkList.appendChild(park);
		park.value = data[i].parkCode;
		park.innerHTML = data[i].fullName;
	};
};


// Park Information Request/Display Function, based on selected park filter
function fetchResults() {
    parkInfo.style.display = "block";
	let parkUrl = baseUrl + "?parkCode=" + parkList.value;

	fetch(parkUrl, options)
		.then(function(parkResults) {
			return parkResults.json();
		})
        // Populate basic Park data - Name, Desc, Weather, Address, Directions
		.then(function(parkData) {
			let parkInfo = parkData.data[0];
			console.log(parkInfo);
			parkName.innerHTML = parkInfo.fullName;
			parkDesc.innerHTML = parkInfo.description;
			parkWeather.innerHTML = parkInfo.weatherInfo;
			parkAddress.innerHTML = `${parkInfo.addresses[0].line1} ${parkInfo.addresses[0].city}, ${parkInfo.addresses[0].stateCode}. ${parkInfo.addresses[0].postalCode}`; 
            googleMapsLink.setAttribute("href", `https://www.google.com/maps/search/${parkInfo.addresses[0].line1}+${parkInfo.addresses[0].city}+${parkInfo.addresses[0].stateCode}+${parkInfo.addresses[0].postalCode}`);
			parkDirections.innerHTML = parkInfo.directionsInfo;
			
            // Wipe Park Fee data before creating a new list
            while(parkFees.firstChild) {
                parkFees.removeChild(parkFees.firstChild)
            }
            // Populates list of fees, categories, costs, and descriptions of each one
            let fees = parkInfo.entranceFees;
            for (fee of fees) {
                let costTitle = document.createElement("ul");
                    parkFees.appendChild(costTitle);
                    costTitle.innerHTML = fee.title;
                let cost = document.createElement("li");
                    costTitle.appendChild(cost);
                    cost.innerHTML = `Cost: $${fee.cost}`;
                let costDesc = document.createElement("li");
                    costTitle.appendChild(costDesc);
                    costDesc.innerHTML = fee.description;
            }


            // Wipe Activities data before populating a new list
			while(parkActivities.firstChild) {
				parkActivities.removeChild(parkActivities.firstChild);
			};
 
			let acts = parkInfo.activities;
			for (act of acts) {
				let activity = document.createElement('li');
				parkActivities.appendChild(activity);
				activity.innerHTML = act.name;
			}

            // Wipe Image data before populating a new list
			while(parkImages.firstChild) {
				parkImages.removeChild(parkImages.firstChild);
			};

            // Wipe current image indicator counter before creating a new list
            while(indicators.firstChild) {
                indicators.removeChild(indicators.firstChild);
            };

            // Populate image carousel
			let pics = parkInfo.images;
			for (pic of pics) {
                let imgIndicator = document.createElement("li");
                indicators.appendChild(imgIndicator);
                imgIndicator.setAttribute("data-target", "#imgCarousel");

                let imgDiv = document.createElement("div");
                imgDiv.setAttribute("class", "carousel-item")
                parkImages.appendChild(imgDiv);

				let image = document.createElement('img');
				imgDiv.appendChild(image);
				image.src = pic.url;
                image.setAttribute("class", "d-block w-100")
			};
                // Ensure the first item in each list is the Active element
                parkImages.children[0].setAttribute("class", "carousel-item active");
                indicators.children[0].setAttribute("class", "active");
		});

};
