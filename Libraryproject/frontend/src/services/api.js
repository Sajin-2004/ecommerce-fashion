import axios from "axios";
import { API_BASE_URL } from "../config";

export default axios.create({
    baseURL: process.env.REACT_APP_API_URL || API_BASE_URL
});