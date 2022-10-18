async function getData() {
    const response = await fetch( '/api');
    const data = await response.json();

    for (item of data) {
        const root = document.createElement('p');
        const geo = document.createElement('div');
        const mood = document.createElement('div');
        const date = document.createElement('div');
        

        geo.textContent = `Localização: ${item.cidade}`;
        mood.textContent = `Anotações: ${item.mood}`;
        date.textContent = new Date (item.timestamp).toLocaleDateString();

        root.append(geo, mood, date);
        document.body.append(root);
    }
    console.log(data); 
}
getData();