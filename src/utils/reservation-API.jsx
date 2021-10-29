import axios from 'axios'


const baseURL = process.env.REACT_APP_BASE_URL || `http://localhost:8080/api/`

const api = axios.create({
    baseURL
})

export const getReservationById = async (id) => {
    return await api.get(`/reservation/${id}`);
};