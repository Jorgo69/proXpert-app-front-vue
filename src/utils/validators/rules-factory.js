// Règles génériques réutilisables
export const rulesFactory = {
  required: (msg = 'Ce champ est requis') => (value) =>
    (value !== undefined && value !== null && String(value).trim() !== '') || msg,

  email: (msg = 'Email invalide') => (value) =>
    (/^\S+@\S+\.\S+$/.test(String(value || ''))) || msg,

  minLength: (n, msg) => (value) =>
    (String(value || '').length >= n) || (msg || `Doit contenir au moins ${n} caractères`),

  matchField: (otherField, msg) => (value, form) =>
    (value === (form?.[otherField] ?? '')) || (msg || 'Ne correspond pas')
}
