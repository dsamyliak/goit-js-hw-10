import './css/styles.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import RestCountriesAPI from "./js/components/fetchCountries";
import { debounce } from 'lodash';

// constants
const DEBOUNCE_DELAY = 300;
const refs = {
  searchBox: document.querySelector("input#search-box"),
  sameWordList: document.querySelector(".country-list"),
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
  // console.log(name);

  if (name !== "") {
    restCountriesAPI.name = name;
    restCountriesAPI.fetchCountries(name).then(countryGetInfo => {
  
      renderCountryInfo(countryGetInfo);
    
    });
  }
};
///////////////////////////////
function renderCountryInfo(countryGetInfo) {
  const { name, capital, population, flags, languages } = countryGetInfo;
 
  console.log(countryGetInfo);
  console.log(countryGetInfo[0]);
  console.log(countryGetInfo[1]);
      // console.log(flags.svg);
      // console.log(name.official);
      // console.log(capital);
      // console.log(population);
      // for (const element of Object.values(languages)) { console.log(element);};
    

};

// console.log(restCountriesAPI);


  
function renderUserList(users) {

  const markup = users
    .map((user) => {
      return `<li>
          <p><b>UserID</b>: ${user.id}</p>
          <p><b>Name</b>: ${user.name}</p>
          <p><b>Email</b>: ${user.email}</p>
          <p><b>Company</b>: ${user.company.name}</p>
          <p class="photoList"><b>Photo</b>:</p>
        </li>`;
    })
    .join("");

  userList.innerHTML = markup;
};

function photosAfterParagraph (photos) {
    setTimeout(() => {
      const photoList = document.querySelectorAll(".photoList");
      console.log(photoList);

      for (const key in photos) {
        let htmlString = ` <img src="${photos[key].thumbnailUrl}" alt="${photos[key].title}" srcset="" id=${photos[key].id}></img>`;
        photoList[key].insertAdjacentHTML("beforeend", htmlString);
      
      // console.log(photoList[key]);
      // console.log(photos[key].title);
        Notiflix.Notify.success("response ok");
    }
    }, 500);
  
  
};