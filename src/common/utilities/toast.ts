// src/utils/toastUtils.ts
import { toast, ToastOptions } from 'react-toastify'

// Default success toast function with optional custom options
export const showSuccessToast = (message: string, options: ToastOptions = { autoClose: 1500 }) => {
  toast.success(message, options)
}

// Default error toast function with optional custom options
export const showErrorToast = (message: string, options: ToastOptions = { autoClose: 1500 }) => {
  toast.error(message, options)
}
