import { env } from "../../app.config";
import { apiClient } from "../utils/axiosClient.";

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