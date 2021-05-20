import './sass/main.scss';



fetch('https://restcountries.eu/rest/v2/name/Colombia')
    .then(response => {
    return response.json();
    })
    .then(countri => {
        console.log(countri);
    })
    .catch(error => {
        console.log(error);
    });
