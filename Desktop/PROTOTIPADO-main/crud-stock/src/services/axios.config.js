import axios from 'axios';

const URL = 'https://65954adc04335332df8266fb.mockapi.io/api/stockProducts'

export const axiosInstance = axios.create({
    baseURL: URL
})