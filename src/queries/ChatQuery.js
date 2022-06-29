import { env } from "../../app.config";
import { apiClient } from "../utils/axiosClient.";

export const getMyRooms = async () => {
  try {
    const res = await apiClient({
      method: 'GET',
      url: `${env.API.CHAT_URL}/rooms/my`
    })
    if (res) {
      return res.data
    } else {
      throw new Error('Impossible de récupérer les rooms');
    }
  } catch (e) {
    throw e
  }
}

export const getRoom = async (id) => {
  try {
    const res = await apiClient({
      method: 'GET',
      url: `${env.API.CHAT_URL}/rooms/${id}`
    })
    if (res) {
      return res.data
    } else {
      throw new Error('Impossible de récupérer la room');
    }
  } catch (e) {
    throw e
  }
}

export const getRoomMessages = async (id) => {
  try {
    const res = await apiClient({
      method: 'GET',
      url: `${env.API.CHAT_URL}/rooms/${id}/messages`
    })
    if (res) {
      return res.data
    } else {
      throw new Error('Impossible de récupérer les messages');
    }
  } catch (e) {
    throw e
  }
}