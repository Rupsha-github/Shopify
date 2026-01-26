import axios from "axios";
import { products } from "../data/products.js";

// const BaseUrl = "https://api.escuelajs.co/api/v1";

export const getAllProducts = () => {
    try {
        return products;  
    } catch (err) {
        return err;
    }
}