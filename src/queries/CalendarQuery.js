import { env } from "../../app.config";
import { apiClient } from "../utils/axiosClient.";

export const getCalendar = async (data) => {
  try {
    const res = await apiClient({
      method: 'GET',
      url: `${env.API.BASE_URL}/calendar/timetable`
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

export const getTeacherCalendar = async (id) => {
  try {
    const res = await apiClient({
      method: 'POST',
      url: `${env.API.BASE_URL}/calendar/teacher/timetable`,
      data:{
        teacher_id: id
      }
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