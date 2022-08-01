import { env } from "../../app.config";
import { apiClient } from "../utils/axiosClient.";
import { toastError, toastSuccess } from "../utils/toastUtils";

export const searchAddress = async (data, token) => {
  try {
    const res = await apiClient({
      method: 'GET',
      url: `${env.API.MAP}/v1/searchAutocomplete?q=${data}`,
      headers: { "Authorization": `Bearer ${token}` }
    })
    if (res) {
      return res.data
    } else {
      throw new Error('Impossible de rechercher');
    }
  } catch (e) {
    throw e
  }
}

export const searchAddressDetails = async (completionUrl, token) => {
  try {
    const res = await apiClient({
      method: 'GET',
      url: `${env.API.MAP}${completionUrl}`,
      headers: { "Authorization": `Bearer ${token}` }
    })
    if (res) {
      return res.data
    } else {
      throw new Error('Impossible de rechercher');
    }
  } catch (e) {
    throw e
  }
}

export const getMapToken = async () => {
  try {
    const res = await apiClient({
      method: 'GET',
      url: `${env.API.CHAT_URL}/maps/token`
    })
    if (res) {
      return res.data
    } else {
      throw new Error('Impossible de récupérer le token');
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
        return { "data": true }
      } else {
        toastError('Impossible d\'attacher l\'addresse')
        return { "data": false }
      }
      return res.data
    } else {
      throw new Error('Impossible d\'attacher une adresse');
    }
  } catch (e) {
    throw e
  }
}

export const getMyAddress = async () => {
  try {
    const res = await apiClient({
      method: 'GET',
      url: `${env.API.BASE_URL}/address/my`
    })
    if (res) {
      return res.data
    } else {
      throw new Error('Impossible de récupérer l\'adresse');
    }
  } catch (e) {
    throw e
  }
}