
     //json com dados do cliente
     let lat, lon;
     const button = document.getElementById('submit');
     button.addEventListener('click', async (event) =>{
            const mood =document.getElementById('mood').value;
            const data = {lat, lon, mood};
            const options = {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            const response = await fetch('/api', options);
            const json = await response.json();
            console.log(json);
            
        });

         //INICIANDO O MAPA
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
    document.getElementById('latitude').textContent = lat;
    document.getElementById('longitude').textContent = lon;
    const data = {lat, lon};
    // console.log(position);
    marker.setLatLng([lat, lon]);
    map.setView([lat,lon], 12);   
   
  });

} else {
  console.log('geolocalização não encontrada');
}


