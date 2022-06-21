import { env } from "../../app.config";
import { apiClient } from "../utils/axiosClient.";

export const getUpcomingLessons = async (page) => {
  try {
    const res = await apiClient({
      method: 'GET',
      url: `${env.API.BASE_URL}/lessons?page=${page}`
    })
    if (res) {
      return res.data
    } else {
      throw new Error('Impossible de récupérer le cours');
    }
  } catch (e) {
    throw e
  }
}

export const getHistoryLessons = async (page) => {
  try {
    const res = await apiClient({
      method: 'GET',
      url: `${env.API.BASE_URL}/lessons/history?page=${page}`
    })
    if (res) {
      return res.data
    } else {
      throw new Error('Impossible de récupérer le cours');
    }
  } catch (e) {
    throw e
  }
}

export const getLesson = async (id) => {
  try {
    const res = await apiClient({
      method: 'GET',
      url: `${env.API.BASE_URL}/lessons/${id}`
    })
    if (res) {
      return res.data
    } else {
      throw new Error('Impossible de récupérer le cours');
    }
  } catch (e) {
    throw e
  }
}

export const cancelLesson = async (id) => {
  try {
    const res = await apiClient({
      method: 'DELETE',
      url: `${env.API.BASE_URL}/lessons/${id}`
    })
    if (res) {
      return res.data
    } else {
      throw new Error('Impossible d\'annuler le cours');
    }
  } catch (e) {
    throw e
  }
}

export const bookLesson = async (data) => {
  try {
    const res = await apiClient({
      method: 'POST',
      url: `${env.API.BASE_URL}/lessons`,
      data
    })
    if (res) {
      return res.data
    } else {
      throw new Error('Impossible de reserver le cours');
    }
  } catch (e) {
    throw e
  }
}