// function to check if number is odd
function isOdd(num) { 
	return num % 2;
}

// function to delay execution fo X ms
function sleepFor(sleepDuration){
	var now = new Date().getTime();
	while(new Date().getTime() < now + sleepDuration){ /* Do nothing */ }
}

//function to Parse AND Display Data
function ParseData(data) {
	console.log(data);
	var city = data.properties.name;
	var forecast = data.properties.forecast;
	
	
	var newDiv = document.createElement("div");
	newDiv.setAttribute("id", city);
	newDiv.setAttribute("class", "details");
	var newContent = document.createTextNode("");
	newDiv.appendChild(newContent);
	
	

	var currentDiv = document.getElementById('legende');
	document.body.insertBefore(newDiv, currentDiv);
	
	var ul = document.getElementById(city);
	let container = document.getElementById(city)
	
	var citydiv = document.getElementById(city);
	newContent = document.createTextNode(city);
	newDiv.appendChild(newContent);
	
	var timeol = document.createElement("ol");
	timeol.setAttribute("id", city+'time');
	timeol.setAttribute("class", 'graphique-time-list');
	timeol.appendChild(newContent);
	citydiv.appendChild(timeol);
	
	var graphol = document.createElement("ol");
	graphol.setAttribute("id", city+'graph');
	graphol.setAttribute("class", 'graphique-graf-list');
	graphol.appendChild(newContent);
	citydiv.appendChild(graphol);
	
	var litime = document.getElementById(city+'time');
	var ligraf = document.getElementById(city+'graph');
	
	
	for (let i = 0; i < 9; i++) {
		date = new Date(Date.parse(data.properties.forecast[i].time));
		rain_intensity=data.properties.forecast[i].rain_intensity;
		var minutes = String(date.getMinutes());
		
		if(minutes.length == 1){
			minutes = '0'+minutes;
		}
		console.log(minutes.length);
		date = date.getHours()+'h'+minutes;

		if(isOdd(i) == 0){
			var timeli = document.createElement("li");
			timeli.appendChild(document.createTextNode(date));
			timeli.setAttribute("class", "graphique-time-item");
			timeol.appendChild(timeli);
		}
		var graphli = document.createElement("li");
		//graphli.appendChild(document.createTextNode(data.properties.forecast[i].rain_intensity));
		graphli.setAttribute("class", "graphique-graf-item rain-"+data.properties.forecast[i].rain_intensity);
		graphol.appendChild(graphli);
		
	}
}

const VillesList = { 
	ennes : 'https://rpcache-aa.meteofrance.com/internet2018client/2.0/nowcast/rain?lat=48.111979&lon=-1.681864&token=__Wj7dVSTjV9YGu1guveLyDq0g7S7TfTjaHBTPTpO0kj8__', 
	esson : 'https://rpcache-aa.meteofrance.com/internet2018client/2.0/nowcast/rain?lat=48.120227&lon=-1.597144&token=__Wj7dVSTjV9YGu1guveLyDq0g7S7TfTjaHBTPTpO0kj8__', 
	horigne : 'https://rpcache-aa.meteofrance.com/internet2018client/2.0/nowcast/rain?lat=48.156608&lon=-1.584099&token=__Wj7dVSTjV9YGu1guveLyDq0g7S7TfTjaHBTPTpO0kj8__'
	};

for (const Ville in VillesList){
	out = fetch(`${VillesList[Ville]}`)
	.then(res => res.json())
	.then(out =>
	ParseData(out)
	)
	.catch(err => { throw err });
	
	//on triche pour garder l'ordre des villes
	sleepFor(500);
}