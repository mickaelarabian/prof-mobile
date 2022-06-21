import { env } from "../../app.config";
import { apiClient } from "../utils/axiosClient.";
import axios from 'axios';

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