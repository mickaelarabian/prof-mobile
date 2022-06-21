import { env } from "../../app.config";
import { apiClient } from "../utils/axiosClient.";

export const searchAddress = async (data) => {
  try {
    const res = await apiClient({
      method: 'GET',
      url: `${env.API.MAP_BOX}${data}.json?proximity=ip&types=address&access_token=${env.KEYS.MAP_BOX}`    })
    if (res) {
      return res.data
    } else {
      throw new Error('Impossible de s\'inscrire');
    }
  } catch (e) {
    throw e
  }
}

export const attachAddress = async (data) => {
  try {
    const res = await apiClient({
      method: 'post',
      url: `${env.API.BASE_URL}/places/atach`,
      data
    })
    if (res) {
      return res.data
    } else {
      throw new Error('Impossible d\'attacher une adresse');
    }
  } catch (e) {
    throw e
  }
}