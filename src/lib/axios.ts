import axios from "axios";
const API_KEY = process.env.X_API_KEY;

export const dogApi = axios.create({
  baseURL: "https://api.thedogapi.com/v1/",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
});

export const catApi = axios.create({
  baseURL: "https://api.thecatapi.com/v1/",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
});
