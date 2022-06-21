import { env } from "../../app.config";
import { apiClient } from "../utils/axiosClient.";

export const getPayments = async () => {
  try {
    const res = await apiClient({
      method: 'GET',
      url: `${env.API.BASE_URL}/payments`
    })
    if (res) {
      return res.data
    } else {
      throw new Error('Impossible de récupérer les moyens de paiements');
    }
  } catch (e) {
    throw e
  }
}

export const getPaymentsCharges = async () => {
  try {
    const res = await apiClient({
      method: 'GET',
      url: `${env.API.BASE_URL}/payments/charges`
    })
    if (res) {
      return res.data
    } else {
      throw new Error('Impossible de récupérer les paiements');
    }
  } catch (e) {
    throw e
  }
}