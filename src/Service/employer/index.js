import { Get, Post } from "../axios";
let BASE_URL_EMPLOYER = "employer";
const EmployerConfigAPI = {
  createEmployer: async (payload) => {
    try {
      const res = await Post(`${BASE_URL_EMPLOYER}/`, payload);
      return res;
    } catch (error) {
      throw error;
    }
  },

  loginEmployer: async (payload) => {
    try {
      const res = await Get(`${BASE_URL_EMPLOYER}/login?email=${payload.business_email}&password=${payload.password}`);
      return res;
    } catch (error) {
      throw error;
    }
  },
};

export default EmployerConfigAPI;
