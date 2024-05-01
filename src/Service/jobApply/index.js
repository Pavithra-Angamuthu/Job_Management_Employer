import { Get, Post } from "../axios";
let BASE_URL_APPLY = "apply";
const JobApplyConfigAPI = {
  getJobApplyBasedOnOpening: async (payload) => {
    try {
      const res = await Get(`${BASE_URL_APPLY}?id=${payload.job_id}`, payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
};

export default JobApplyConfigAPI;
