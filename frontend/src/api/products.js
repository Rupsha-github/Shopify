import apiClient from "./axios";

export const getAllProducts = async () => {
  const response = await apiClient.get("/products");
  return response.data;
};