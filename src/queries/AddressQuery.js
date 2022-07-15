import { env } from "../../app.config";
import { apiClient } from "../utils/axiosClient.";
import { toastError, toastSuccess } from "../utils/toastUtils";

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
      url: `${env.API.BASE_URL}/places/attach`,
      data
    })
    if (res) {
      if(res.status === 200){
        toastSuccess('L\'addresse a bien été attaché')
      } else {
        toastError('Impossible d\'attacher l\'addresse')
      }
      return res.data
    } else {
      throw new Error('Impossible d\'attacher une adresse');
    }
  } catch (e) {
    throw e
  }
}