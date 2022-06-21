import { env } from "../../app.config";
import { apiClient } from "../utils/axiosClient.";

export const getSubjects = async () => {
  try {
    const res = await apiClient({
      method: 'GET',
      url: `${env.API.BASE_URL}/subject/all`
    })
    if (res) {
      return res.data
    } else {
      throw new Error('Impossible de récupérer les matières');
    }
  } catch (e) {
    throw e
  }
}