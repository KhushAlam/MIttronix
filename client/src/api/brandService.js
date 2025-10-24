import instance from "./axios.config.js";
import { mockProducts } from "./mockData.js";

export const brandService = {
  getBrands: async () => {
    try {
      const response = await instance.get("/brand");
      return response.data;
    } catch (error) {
      // Fallback: derive brands from mock products
      const unique = Array.from(
        new Set((mockProducts || []).map((p) => p.brand).filter(Boolean))
      );
      return unique.map((name, i) => ({ _id: `brand-${i + 1}`, name }));
    }
  },

  createBrand: async (brandData) => {
    try {
      const response = await instance.post("/brand", brandData);
      return response.data;
    } catch (error) {
      // Local fallback
      return { _id: "local_" + Date.now(), ...brandData };
    }
  },

  updateBrand: async (id, brandData) => {
    try {
      const response = await instance.put(`/brand/${id}`, brandData);
      return response.data;
    } catch (error) {
      return { _id: id, ...brandData };
    }
  },

  deleteBrand: async (id) => {
    try {
      const response = await instance.delete(`/brand/${id}`);
      return response.data;
    } catch (error) {
      return { success: true };
    }
  },
};
