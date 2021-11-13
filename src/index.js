import './css/styles.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import RestCountriesAPI from "./js/components/fetchCountries";
import { debounce } from 'lodash';
export { refs };

// constants
const DEBOUNCE_DELAY = 300;
const refs = {
  searchBox: document.querySelector("input#search-box"),
  countryList: document.querySelector(".country-list"),
  countryInfo: document.querySelector(".country-info"),
};
let name = '';
const restCountriesAPI = new RestCountriesAPI();

// input Event Listener
refs.searchBox.addEventListener("input",
  debounce(onSearch, DEBOUNCE_DELAY, { trailing: true }));

// onSearch function
function onSearch(e) {
  e.preventDefault();
  
  name = e.path[0].value.trim();
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';

  if (name !== "") {
    restCountriesAPI.name = name;
    restCountriesAPI.fetchCountries(name).then(countryGetInfo => {
  
      renderCountryInfo(countryGetInfo);
    
    });

  }
};

// render country information to html
function renderCountryInfo(countryGetInfo) {

    for (const key in countryGetInfo) {
    if (Object.hasOwnProperty.call(countryGetInfo, key)) {
        
      const element = countryGetInfo[key];
      console.log(element);
      console.log(countryGetInfo);

      const { name, capital, population, flags, languages
      } = element;
  
 
      console.log(countryGetInfo.length);
      
        
      if (countryGetInfo.length > 1 && countryGetInfo.length < 10) {

        refs.countryInfo.innerHTML = '';
        refs.countryList.innerHTML = '';
        
        return AddCountryList(countryGetInfo);
        
      }
      
      if (countryGetInfo.length === 1) {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        
        return AddCountryFullInfo(countryGetInfo);

      };
      
      if (countryGetInfo.length > 10) {
        
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        
      }

// add country full info
      function AddCountryFullInfo(countryGetInfo) {
      
        return refs.countryInfo.insertAdjacentHTML("beforeend", `<div class="flag-country-block">
        <img
          class="flag"
          src="${flags.svg}"
          alt="flag"
        />
        <h1>${name.official}</h1>
      </div>
      <ul class="country-info-details">
        <li class="country-info-item">
          <h2>Capital:</h2>
          <span class="info-value">${capital}</span>
        </li>
        <li class="country-info-item">
          <h2>Population:</h2>
          <span class="info-value">${population}</span
          >
        </li>
        <li class="country-info-item">
          <h2>Languages:</h2>
          <span class="info-value">${Object.values(languages)}</span
          >
        </li>
      </ul>`);
    }
    }
  };

  
};

// add many countries to list 
function AddCountryList(countryGetInfo) {

  

  const markup = countryGetInfo.map((item) => {
    console.log(item);

    return `<li class="country-list-item">
        <img
          class="flag-list"
          src="${item.flags.svg}"
          alt="flag"
          />
        <h2 class="list-item-h2">${item.name.official}</h2>
      </li>`
  }).join("");

  refs.countryList.insertAdjacentHTML("beforeend", markup);
  

};