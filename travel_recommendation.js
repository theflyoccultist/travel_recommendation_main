document.getElementById('searchBtn').addEventListener('click', function() {
    const input = document.getElementById('searchTextField').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            //search for cities by country
            const country = data.countries.find(item => item.name.toLowerCase() === input);
            if (country) {
                const cities = country.cities;
                if (cities.length >= 2) {
                    // Display information for the first two cities
                    resultDiv.innerHTML = `<p>Recommended cities in ${country.name}:</p>`;
                    for (let i = 0; i < 2; i++) {
                        const city = cities[i];
                        resultDiv.innerHTML += `
                            <div id="resultBlock">
                                <img src="${city.imageUrl}" alt="${city.name}">
                                <h3>${city.name}</h3>
                                <p>Description: ${city.description}</p>
                                <button>Visit</button>
                            </div>
                        `;
                    }
                } else {
                    resultDiv.innerHTML = `<p>No cities found for ${country.name}</p>`;
                }
            }

            // Search for temples if the input contains the keyword "temple"
            if (input.includes('temple')) {
                const temples = data.temples;
                if (temples.length > 0) {
                    resultDiv.innerHTML += `<p>Temples:</p>`;
                    temples.forEach(temple => {
                        resultDiv.innerHTML += `
                            <div id="resultBlock">
                                <img src="${temple.imageUrl}" alt="${temple.name}">
                                <h3>${temple.name}</h3>
                                <p>Description: ${temple.description}</p>
                                <button>Visit</button>
                            </div>
                        `;
                    });
                } else {
                    resultDiv.innerHTML += `<p>No temples found</p>`;
                }
            }

            // Search for beaches if the input contains the keyword "beach"
            if (input.includes('beach')) {
                const beaches = data.beaches;
                if (beaches.length > 0) {
                    resultDiv.innerHTML += `<p>Beaches:</p>`;
                    beaches.forEach(beach => {
                        resultDiv.innerHTML += `
                            <div id="resultBlock">
                                <img src="${beach.imageUrl}" alt="${beach.name}">
                                <h3>${beach.name}</h3>
                                <p>Description: ${beach.description}</p>
                                <button>Visit</button>
                            </div>
                        `;
                    });
                } else {
                    resultDiv.innerHTML += `<p>No beaches found</p>`;
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = `<p>An error occurred while fetching data.</p>`;
        });
});

document.getElementById('clearBtn').addEventListener('click', function() {
    const input = document.getElementById('searchTextField').value = '';
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
});