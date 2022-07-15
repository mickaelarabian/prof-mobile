import { env } from "../../app.config";
import { apiClient } from "../utils/axiosClient.";
import { toastError, toastSuccess } from "../utils/toastUtils";

export const getTeachers = async (id) => {
  try {
    const res = await apiClient({
      method: 'POST',
      url: `${env.API.BASE_URL}/teacher/search`,
      data:{
        subject_id: id
      }
    })
    if (res) {
      return res.data
    } else {
      throw new Error('Impossible de récupérer les professeurs');
    }
  } catch (e) {
    throw e
  }
}

export const getTeacher = async (id) => {
  try {
    const res = await apiClient({
      method: 'GET',
      url: `${env.API.BASE_URL}/teacher/${id}`
    })
    if (res) {
      return res.data
    } else {
      throw new Error('Impossible de récupérer le professeur');
    }
  } catch (e) {
    throw e
  }
}

export const canReview = async (teacher_id) => {
  try {
    const res = await apiClient({
      method: 'POST',
      url: `${env.API.BASE_URL}/reviews/can`,
      data: {
        teacher_id
      }
    })
    if (res) {
      return res.data
    } else {
      throw new Error('Impossible de récupérer l\'information');
    }
  } catch (e) {
    throw e
  }
}

export const sendReview = async (note, comment, to) => {
  try {
    const res = await apiClient({
      method: 'POST',
      url: `${env.API.BASE_URL}/reviews`,
      data: {
        note,
        comment,
        to
      }
    })
    if (res) {
      if (res.status === 201) {
        toastSuccess('Le commentaire a bien été publié')
      } else {
        toastError('Impossible de publier le commentaire')
      }
      return res.data
    } else {
      throw new Error('Impossible de poster l\'avis');
    }
  } catch (e) {
    throw e
  }
}
