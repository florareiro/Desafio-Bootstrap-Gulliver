//json com dados do cliente

let cidade;
const button = document.getElementById("submit");
button.addEventListener("click", async (event) => {
  const mood = document.getElementById("mood").value;
  const cidade = document.getElementById("cidade").textContent;

  const data = { mood, cidade };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch("/api", options);
  const json = await response.json();
  console.log(json);
});

//INICIANDO O MAPA
const map = L.map("mapa").setView([0, 0], 3);

const marker = L.marker([0, 0]).addTo(map);

const attribution =
  '© OpenStreetMap; <a href ="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);

//API DE GEOLOCALIZAÇÃO CLIENTE

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(async (position) => {
    console.log("geolocalização disponivel");
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    // console.log(position);
    marker.setLatLng([lat, lon]);
    console.log(lat, lon);
    map.setView([lat, lon], 12);

    // API CLIMA
    const API_key = "32ae98f7cb98e2b734b003cea7eb0273";
    const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`;
    const response = await fetch(api_url);
    const json = await response.json();

    //  console.log(json);
    document.getElementById("cidade").textContent = json.name;
    const cidade = json.name;
  });
} else {
  console.log("geolocalização não encontrada");
}
