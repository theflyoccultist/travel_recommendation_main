document.getElementById('clearBtn').addEventListener('click', function() {
    const input = document.getElementById('searchTextField').value = '';
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
});

document.getElementById('searchBtn').addEventListener('click', function() {
    const input = document.getElementById('searchTextField').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const country = data.countries.find(item => item.name.toLowerCase() === input);
            if (country) {
                const cities = country.cities;
                if (cities.length >= 2) {
                    // Display information for the first two cities
                    resultDiv.innerHTML = `<p>Recommended cities in ${country.name}:</p>`;
                    for (let i = 0; i < 2; i++) {
                        const city = cities[i];
                        resultDiv.innerHTML += `
                            <div>
                                <h3>${city.name}</h3>
                                <p>Description: ${city.description}</p>
                                <img src="${city.imageUrl}" alt="${city.name}">
                            </div>
                        `;
                    }
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