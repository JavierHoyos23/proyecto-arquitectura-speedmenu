import axios from 'axios';

export class DishService{
    baseUrl = "http://localhost:8080/menu/"

    getAll(){
        return axios.get(this.baseUrl).then(res => res.data);
    }
}