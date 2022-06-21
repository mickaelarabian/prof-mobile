import { env } from "../../app.config";
import { apiClient } from "../utils/axiosClient.";

export const updateCurrentUser = async (data) => {
  try {
    const res = await apiClient({
      method: 'put',
      url: `${env.API.BASE_URL}/users`,
      data
    })
    if (res) {
      return res.data
    } else {
      throw new Error('Impossible de modifier l\'utilisateur');
    }
  } catch (e) {
    throw e
  }
}