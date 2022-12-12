import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://pacific-waters-20447.herokuapp.com/'
})
export default instance