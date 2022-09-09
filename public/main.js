
     

//          //INICIANDO O MAPA
         const map = L.map('mapa').setView([0,0], 3);

const marker =   L.marker([0, 0]).addTo(map);

const attribution =
    '© OpenStreetMap; <a href ="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';    
const tiles = L.tileLayer(tileUrl, {attribution});
tiles.addTo(map);   

//API DE GEOLOCALIZAÇÃO CLIENTE

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition( async position => {
    console.log('geolocalização disponivel');
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    // document.getElementById('latitude').textContent = lat;
    // document.getElementById('longitude').textContent = lon;
    const data = {lat, lon};
    
    
    // API CLIMA
    const API_key = '1e37be63938b4de6be125501220709';
   const api_url = `http://api.weatherapi.com/v1/current.json?key=${API_key}&q=${lat},${lon}&aqi=no&lo`;
    const response = await fetch(api_url);
    const json = await response.json();
    console.log(json);
    document.getElementById('cidade').textContent = json.location.name;
    document.getElementById('regiao').textContent = json.location.region;
    document.getElementById('temperatura').textContent = json.current.temp_c;

    // console.log(position);
    marker.setLatLng([lat, lon]);
    map.setView([lat,lon], 12);   
   

    // API RESTAURANTES
    const key_restaurant = 'dc0b091820824302a18c4037fc870ce1';
    const restaurant_api = `https://api.geoapify.com/v2/places?categories=catering&filter=circle:${lon},${lat},5000&bias=proximity:${lon},${lat}&limit=20&apiKey=${key_restaurant}`;
    const response_restaurant = await fetch (restaurant_api);
    const restaurant_json = await response_restaurant.json();
    console.log(restaurant_json);
  
  
  });

} else {
  console.log('geolocalização não encontrada');
}


