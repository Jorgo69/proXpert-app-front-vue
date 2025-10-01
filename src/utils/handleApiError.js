// utils/handleApiError.js
export function handleApiError(error, addToast) {
  // Log pour le dev
  console.error("API Error:", error.response?.data || error.message)

  // Si le backend renvoie des erreurs de validation (Laravel)
  if (error.response?.data?.errors) {
    const errors = error.response.data.errors
    Object.values(errors).forEach(errArr => {
      if (Array.isArray(errArr)) {
        errArr.forEach(msg => addToast(msg, 'error'))
      } else {
        addToast(String(errArr), 'error')
      }
    })
    return
  }

  // Si c'est un message simple
  if (error.response?.data?.message) {
    addToast(error.response.data.message, 'error')
    return
  }

  // Cas par défaut (ex: pas de réponse du serveur)
  addToast('Une erreur est survenue. Réessayez.', 'error')
}
