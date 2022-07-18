import { env } from "../../app.config";
import { apiClient } from "../utils/axiosClient.";
import axios from 'axios';
import { toastError, toastSuccess } from "../utils/toastUtils";

export const register = async (data) => {
  try {
    const res = await apiClient({
      method: 'post',
      url: `${env.API.BASE_URL}/auth/signup`,
      data
    })
    if (res) {
      return res.data
    } else {
      throw new Error('Impossible de s\'inscrire');
    }
  } catch (e) {
    throw e
  }
}

export const login = async (data) => {
  try {
    const res = await apiClient({
      method: 'post',
      url: `${env.API.BASE_URL}/auth/login`,
      data
    })
    if (res) {
      return res.data
    } else {
      throw new Error('Impossible de se connecter');
    }
  } catch (e) {
    throw e
  }
}

export const getCurrentUser = async (token) => {
  try {
    const res = await apiClient({
      method: 'get',
      url: `${env.API.BASE_URL}/auth/current`,
      headers: { "Authorization": `Bearer ${token}` }
    })
    if (res) {
      return res.data
    } else {
      throw new Error('Impossible de récuper l\'utilisateur');
    }
  } catch (e) {
    throw e
  }
}

export const resetpassword = async (email) => {
  try {
    const res = await apiClient({
      method: 'put',
      url: `${env.API.BASE_URL}/auth/password/ask-for-reset`,
      data : {
        email
      }
    })
    if (res) {
      console.log('ress', res)
      if(res.status === 200){
        toastSuccess('Email envoyé avec succé')
        return {"data": true}
      } else {
        toastError(res.data.error || 'Impossible d\'envoyer le mail')
        return {"data": false}
      }
    } else {
      throw new Error('Impossible de réinitialiser le mot de passe');
    }
  } catch (e) {
    throw e
  }
}