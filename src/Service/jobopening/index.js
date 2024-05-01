import { Get, Post } from "../axios";
let BASE_URL_Opening= "opening";
const JobOpeningConfigAPI = {
  createOpening: async (payload) => {
    try {
      const res = await Post(`${BASE_URL_Opening}/`, payload);
      return res;
    } catch (error) {
      throw error;
    }
  },

  getOpeningsBasedOnEmp: async (payload) => {
    try {
      const res = await Get(`${BASE_URL_Opening}/emp?id=${payload.emp_id}`,);
      return res;
    } catch (error) {
      throw error;
    }
  },

//   loginEmployer: async (payload) => {
//     try {
//       const res = await Get(`${BASE_URL_Opening}/login?email=${payload.business_email}&password=${payload.password}`);
//       return res;
//     } catch (error) {
//       throw error;
//     }
//   },
};

export default JobOpeningConfigAPI;
