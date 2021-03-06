import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

import countryCardTpl from './templates/country-card.hbs';
import countryListTpl from './templates/country-list.hbs';
import countrySelectListTpl from './templates/select-country.hbs';
import fetchCountry from './fetchCountries'
import './sass/main.scss';


const refs = {
    cardContainer: document.querySelector('.js-card-container'),
    searchForm: document.querySelector('.js-search-form'),
    form: document.querySelector('.search-form')
}

refs.searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
    resetPage()
    e.preventDefault();
    
    const form = e.target;
    const searchQuery = form.value.trim();
    
    if (searchQuery !== '') {
         fetchCountry(searchQuery)
             .then(arrayOfCountries => {
                //  const markupSelect = countrySelectListTpl(arrayOfCountries);
                //  refs.form.innerHTML = markupSelect;
            
            if (arrayOfCountries.length > 10) {
                // renderSelectList(arrayOfCountries)
                error({
                    text: 'Too many matches found. Please enter a more specific query!',
                    mode: 'light',
                    closer: true,
                    sticker: false,
                    hide: true,
                    delay: 1000,
                });
                return;   
            }

            if (arrayOfCountries.length >= 2 && arrayOfCountries.length <= 10) {
                // renderSelectList(arrayOfCountries)
                renderCountryList(arrayOfCountries);
                return;
            }

            if (arrayOfCountries.length = 1) {
                // renderSelectList(arrayOfCountries)
                renderCountryCard(arrayOfCountries);
                resetForm();
                return;  
            }
            
        })
        .catch(onFetchError);

    }  
    
    
}

function renderCountryCard(country) {
    const markup = countryCardTpl(country);
    refs.cardContainer.innerHTML = markup;
    
}

function renderCountryList(countries) {
    const markupList = countryListTpl(countries);
    refs.cardContainer.innerHTML = markupList;
}

// function renderSelectList(countries) {
//     const markupSelect = countrySelectListTpl(countries);
//     refs.form.innerHTML = markupSelect;
// }

function resetPage() {
    refs.cardContainer.innerHTML = '';
}
    
function onFetchError(er) {
  error({
    text: `${er}`,
    mode: 'light',
    closer: true,
    sticker: false,
    hide: true,
    delay: 1000,
  });
  resetForm()  
}

function resetForm() {
    refs.form.reset();
}
