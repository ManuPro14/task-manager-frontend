import axios from "axios";

const client = axios.create({
  baseURL:'https://task-management-backend-qult.onrender.com',
})

console.log('client', client);


export default client;