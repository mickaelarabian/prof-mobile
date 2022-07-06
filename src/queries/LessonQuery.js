import { env } from "../../app.config";
import { apiClient } from "../utils/axiosClient.";
import { toastError, toastSuccess } from "../utils/toastUtils";

export const getUpcomingLessons = async (page) => {
  try {
    const res = await apiClient({
      method: 'GET',
      url: `${env.API.BASE_URL}/lessons?status_id=null&page=${page}&date=null&subject_id=null`
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
      url: `${env.API.BASE_URL}/lessons/history?status_id=null&page=${page}&date=null&subject_id=null`
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
      if(res.status === 200){
        toastSuccess('Le cours a bien été annulé')
      } else {
        toastError('error')
      }
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
      console.log('res', res.status)
      if(res.status === 201){
        toastSuccess('Le cours a bien été réservé')
      } else if(res.status === 409){
        toastError('You do not have any payment method')
      } else {
        toastError('Impossible de réserver le cours')
      }
      return res.data
    } else {
      throw new Error('Impossible de reserver le cours');
    }
  } catch (e) {
    throw e
  }
}

export const joinLesson = async (id) => {
  try {
    const res = await apiClient({
      method: 'POST',
      url: `${env.API.BASE_URL}/lessons/join/${id}`
    })
    if (res) {
      if(res.status === 200){
        toastSuccess('Le cours a bien été rejoins')
      } else {
        toastError('Impossible de rejoindre le cours collectif')
      }
      return res.data
    } else {
      throw new Error('Impossible de rejoindre le cours');
    }
  } catch (e) {
    throw e
  }
}