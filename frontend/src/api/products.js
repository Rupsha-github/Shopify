import apiClient from "./axios";

export const getAllProducts = async () => {
    try {
        const response = await apiClient.get("/products");
        return response.data; // Now products will have the MongoDB `_id`
    } catch (err) {
        console.error("Failed to fetch products from backend:", err);
        return [];
    }
}