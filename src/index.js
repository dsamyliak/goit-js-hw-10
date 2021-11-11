import './css/styles.css';

import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { nameCountry } from "./js/components/fetchCountries.js";
import { debounce } from 'lodash';
export { };

const DEBOUNCE_DELAY = 300;
console.log(nameCountry);

const refs = {
  searchBox: document.querySelector("input#search-box"),
  sameWordList: document.querySelector(".country-list"),
  countryInfo: document.querySelector(".country-info"),
};


refs.searchBox.addEventListener("input",
  debounce(onSearch, DEBOUNCE_DELAY, { leading: false, trailing: true }));

function onSearch(e) {
  e.preventDefault();
  const searchQuery = e.currentTarget.elements.query.value;
  console.log(searchQuery);
  
  console.log(refs.searchBox.value);
  // console.log(e.value);
  // parameters to fetch
  const searchOptions = {
    name: refs.searchBox.value
  };
  
  };

  fetchCountry()
    .then((searchOptions) => renderCountryInfo(searchOptions))
    .catch((error) => console.log(error));
  
function fetchCountry() {
  return fetch(`https://restcountries.com/v3.1/all?fields=name.official,capital,population,flags.svg,languages`)
    .then((response) => {
      if (!response.ok) {
        Notiflix.Notify.warning("Oops, there is no country with that name");
        throw new Error(response.status);
      }
      Notiflix.Notify.success("response ok");
      return response.json();
    }
    );
}


function renderCountryInfo() { };



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
  
