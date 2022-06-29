import { env } from "../../app.config";
import { apiClient } from "../utils/axiosClient.";
import { toastError, toastSuccess } from "../utils/toastUtils";

export const updateCurrentUser = async (data) => {
  console.log(data)
  try {
    const res = await apiClient({
      method: 'put',
      url: `${env.API.BASE_URL}/users`,
      data :{
        firstname: data.firstname,
        lastname: data.lastname,
        sexe:data.sexe,
        password: data.password,
        repeat_password: data.repeat_password
      }
    })
    if (res) {
      if(res.status === 200){
        toastSuccess('Profil mis à jour')
      } else {
        toastError('Impossible de mettre à jour le profil')
      }
      return res.data
    } else {
      throw new Error('Impossible de modifier l\'utilisateur');
    }
  } catch (e) {
    throw e
  }
}