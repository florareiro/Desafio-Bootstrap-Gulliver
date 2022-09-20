// //INICIANDO O MAPA
var map = L.map('mapa').setView([0,0], 3);

var icone = L.icon({
  iconUrl : "img/marker.svg",
  
  iconSize:     [40, 45], // size of the icon
   
})
 



const marker =   L.marker([0, 0], {icon: icone}).addTo(map);

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
    
    const data = {lat, lon};
    




   
    // API CLIMA
    const API_key = '1e37be63938b4de6be125501220709';
   const api_url = `http://api.weatherapi.com/v1/current.json?key=${API_key}&q=${lat},${lon}&aqi=no&lo`;
    const response = await fetch(api_url);
    const json = await response.json();
    console.log(json);
    document.getElementById('cidade').textContent = json.location.name;
    document.getElementById('regiao').textContent = json.location.region;
    // document.getElementById('temperatura').textContent = json.current.temp_c;



  // API HOSPEDAGEM
    const key_api = 'dc0b091820824302a18c4037fc870ce1';
    const hospedagem_api = `https://api.geoapify.com/v2/places?categories=accommodation&filter=circle:${lon},${lat},5000&bias=proximity:${lon},${lat}&limit=50&apiKey=${key_api}`;
    const response_hospedagem = await fetch (hospedagem_api);
    const hospedagem_json = await response_hospedagem.json();
 

    
    //Filtrar coordenadas da lista de hospedagens para adicionar marcadores
     var hospedagens = hospedagem_json.features;
    //  console.log(hospedagens);
      


      var nome_hosp = L.geoJSON (hospedagens, {
        onEachFeature: function (Feature, nome_hosp){
         nome_hosp.bindPopup('<h2>'+ Feature.properties.name +'</h2>' + '</br>' + Feature.properties.address_line2);
       
         

        }
        
      }).addTo(map);
    
      // console.log(nome_hosp);
      //Adicionar Marcadores
    
      marker.setLatLng([lat, lon]).addTo(map).bindPopup("Localização Atual"); 
      // marker.bindPopup(nome_hosp).addTo(map);
      map.setView([lat,lon], 12);  

  });

} else {
  console.log('geolocalização não encontrada');
}


