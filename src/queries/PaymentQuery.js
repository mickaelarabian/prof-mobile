import { env } from "../../app.config";
import { apiClient } from "../utils/axiosClient.";
import { toastError, toastSuccess } from "../utils/toastUtils";

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

export const addPaymentDefault = async (default_pm, isDefault) => {
  try {
    const res = await apiClient({
      method: 'POST',
      url: `${env.API.BASE_URL}/payments/default`,
      data: {
        default_pm
      }
    })
    if (res) {
      if (res.status === 200) {
        if (isDefault) {
          toastSuccess('Carte séléctionné par defaut')
        } else {
          toastSuccess('La carte a bien été ajouté')
        }
        return { "data": true }
      } else {
        if (isDefault) {
          toastError('Impossible de définir la carte par defaut')
        } else {
          toastError('Impossible d\'ajouter la carte')
        }
        return { "data": false }
      }
    } else {
      throw new Error('Impossible de mettre la carte par defaut');
    }
  } catch (e) {
    throw e
  }
}

export const generateIntent = async () => {
  try {
    const res = await apiClient({
      method: 'GET',
      url: `${env.API.BASE_URL}/payments/generate_intent`
    })
    if (res) {
      return res.data
    } else {
      throw new Error('Impossible de générer une intention de paiements');
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

export const removePaymentMethod = async (pm_id) => {
  try {
    const res = await apiClient({
      method: 'POST',
      url: `${env.API.BASE_URL}/payments/detach`,
      data: {
        pm_id
      }
    })
    if (res) {
      if (res.status === 200) {
        toastSuccess('La carte a bien été supprimé')
        return { "data": true }
      } else {
        toastError('Impossible de supprimer la carte')
        return { "data": false }
      }
    } else {
      throw new Error('Impossible de supprimer la carte');
    }
  } catch (e) {
    throw e
  }
}