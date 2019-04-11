window.addEventListener('load',()=>{
    let long;
    let lat;
    //declaring the DOM elements
    let temperatureDescription  = document.querySelector('.temperature-description');
    let temperatureDegree  = document.querySelector('.temperature-degree');
    let temperatureDegree1  = document.querySelector('.temperature-degree1');
    let locationTimeZone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');
    const temperatureSpan1 = document.querySelector('.temp');

    // requesting the permission for the location from user
    if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position=>{
    long = position.coords.longitude;
    lat = position.coords.latitude;

    const proxy ="https://cors-anywhere.herokuapp.com/";
    const api = proxy+'https://api.darksky.net/forecast/0be7bfb5d2adaadcef4cab658a1261ba/'+lat+','+long;
    
    fetch(api)
            .then(response =>{
    return response.json();
})
.then(data =>{
    console.log(data);
    const {temperature,summary,icon,apparentTemperature} = data.currently;
    //set DOM elements
    temperatureDegree.textContent = temperature;
    temperatureDegree1.textContent = apparentTemperature;
    temperatureDescription.textContent = 'The weather looks '+summary;
    locationTimeZone.textContent =  data.timezone;
    //Formual for celsius
    let celsius = (temperature -32) *(5/9);
    let cel = (apparentTemperature - 32)*(5/9);
    // set the icons
    setIcons(icon,document.querySelector('.icon'));
    temperatureSection.addEventListener('click',()=>{
        if(temperatureSpan.textContent === '°F'){
            temperatureSpan.textContent = "°C";
            temperatureSpan1.textContent = "°C";
            temperatureDegree.textContent = Math.floor(celsius);
            temperatureDegree1.textContent = Math.floor(cel);
        }
        else{
            temperatureSpan.textContent = "°F";
            temperatureSpan1.textContent = "°F";
            temperatureDegree.textContent = temperature;
            temperatureDegree1.textContent = apparentTemperature;
        }
    });

}); 
    });
        //function to set the icons
    function setIcons(icon,iconId){
        const skycons  = new Skycons({color : 'white'});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();

        skycons.play();
        return skycons.add(iconId,Skycons[currentIcon]);
    }
    }
    else{
        h1.textContent= "please allow location";
    }
});
