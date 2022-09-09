
     

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
   

  
  });

} else {
  console.log('geolocalização não encontrada');
}


