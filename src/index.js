import './css/styles.css';

import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


// lodash and lodash.debounce init

const _ = require('lodash');
const debounce = require('lodash.debounce');
//
const DEBOUNCE_DELAY = 300;

// debounce
const debounce_consoleInfo = debounce(

  function consoleInfo(a) {
    console.log("debounce_fun number", a, "after 1000ms or 1s");
  }, 1000, { 'leading': false, 'trailing': true, }

);
debounce_consoleInfo(5);

// const debounce_deb = debounce(

//     function deb() {
//         console.log('Function debounced after 3000ms!');
//     }, 3000, { 'leading': false, 'trailing': true, }

// );
// debounce_deb();

// debounce

/////////////////////////////////////////////////////////////////////////////////////

// fetch().then().then().catch();

// function fetchExample() {
//   return fetch("https://jsonplaceholder.typicode.com/photos")
//   .then(response => {
//     // Response handling
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//       console.log("response ok");
//       Notiflix.Notify.success("response ok");
//       return response.json();

//   })
//   .then((photos) => {
//     // Data handling
//       console.log(photos);
//       Notiflix.Notify.info("data");
//   })
//   .catch(error => {
//     // Error handling
//       console.log("error");
//       Notiflix.Notify.warning("error");
//   });
// };

// fetchExample();

///////////////////////////////////////////////////////////////////////////

//
// // Using _.debounce() method
// // with its parameters
// const debounce_fun_loop = _.debounce(function() {
//   console.log('Function debounced after 1000ms!XXX');
//   }, 1000, {'leading': false});

// // Defining loop
// const loop = function() {
//     setTimeout(loop, 3)
//     debounce_fun_loop();
// };

// // Calling loop to start
// loop();


//Example

const fetchUsersBtn = document.querySelector(".btn");
const userList = document.querySelector(".user-list");

fetchUsersBtn.addEventListener("click", () => {

  fetchUsers()
    .then((users) => renderUserList(users))
    .catch((error) => console.log(error));
  
  fetchPhotos()
      .then((photos) => photosAfterParagraph(photos))
      .catch((error) => console.log(error))
    ;

});

function fetchUsers() {
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
    );
}

// to fetchPhotos
const searchParams = new URLSearchParams({
  _limit: 10,
  _sort: "id",
});

function fetchPhotos() {
  return fetch(`https://jsonplaceholder.typicode.com/photos?${searchParams}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
    );
}


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
}

function photosAfterParagraph (photos) {
    setTimeout(() => {
      const photoList = document.querySelectorAll(".photoList");
      console.log(photoList);

      for (const key in photos) {
        let htmlString = ` <img src="${photos[key].thumbnailUrl}" alt="${photos[key].title}" srcset="" id=${photos[key].id}></img>`;
        photoList[key].insertAdjacentHTML("beforeend", htmlString);
      
      // console.log(photoList[key]);
      // console.log(photos[key].title);
    }
    }, 500);
  };