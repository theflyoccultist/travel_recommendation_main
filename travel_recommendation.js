document.getElementById('searchBtn').addEventListener('click', function() {
    const input = document.getElementById('searchTextField').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const country = data.countries.find(item => item.name.toLowerCase() === input);
            if (country) {
                // Assuming country has an array of cities
                const cities = country.cities;
                if (cities.length >= 2) {
                    // Display the first two cities
                    const city1 = cities[0];
                    const city2 = cities[1];
                    resultDiv.innerHTML = `<p>Recommended cities in ${country.name}:</p>`;
                    resultDiv.innerHTML += `<p>${city1}</p>`;
                    resultDiv.innerHTML += `<p>${city2}</p>`;
                } else {
                    resultDiv.innerHTML = `<p>No cities found for ${country.name}</p>`;
                }
            } else {
                resultDiv.innerHTML = `<p>Country not found</p>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = `<p>An error occurred while fetching data.</p>`;
        });
});