import axios from "axios"

const URL = 'https://655b2a46ab37729791a8a36d.mockapi.io/productos/'

export async function getProducts() {

    try {
        const { data:productosLeidos } = await axios.get(URL)
        return productosLeidos
    }
    catch(error) {
        console.error('Error al querer obtener los productos', error.message)
        return []
    }
}

