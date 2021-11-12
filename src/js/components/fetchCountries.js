import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class RestCountriesAPI {
    constructor(){
        this.searchName = '';
        this.page = 1;
        this.countryGetInfo = '';
    }

    fetchCountries(name) {

    console.log(name);
    return fetch(`https://restcountries.com/v3.1/name/${this.searchName}?fields=name,capital,population,flags,languages`)
            .then((response) => {
                if (!response.ok) {
                    Notiflix.Notify.warning("Oops, there is no country with that name");
                    throw new Error(response.status);
                }
                Notiflix.Notify.success("response ok");
                return response.json();
          
            })
            .then(data => {
                console.log(data);
                
                this.page += 1;
                this.countryGetInfo = data[0];
                return this.countryGetInfo;
            });
    
};

    get name() {
        return this.searchName;
    }
    
    set name(newName) {
        this.searchName = newName;
    }
}
 




