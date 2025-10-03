import { rulesFactory } from '../rules-factory'

// Règles spécifiques au formulaire de connexion
const fieldRules = {
  // ========== ÉTAPE 1 (Login) ==========
  email: [
    rulesFactory.required('Email requis'),
    rulesFactory.email()
  ],
  
  password: [
    rulesFactory.required('Mot de passe requis'),
    rulesFactory.minLength(6)
  ],

  // ========== ÉTAPE 2 (Vérification OTP) ==========
  verificationCode: [
    rulesFactory.required('Code de vérification requis'),
    rulesFactory.minLength(6, 'Le code doit comporter 6 chiffres'),
    (v) => (/^[0-9]{6}$/.test(String(v || ''))) || 'Le code doit contenir exactement 6 chiffres'
  ],
}

// Mapping des champs par étape
const fieldsByStep = {
  1: ['email', 'password'],           // Étape 1 : Credentials
  2: ['verificationCode']             // Étape 2 : Vérification OTP
}

// Validation d'une étape
export function validateStep(stepNumber, form) {
  const errors = {}
  const toCheck = fieldsByStep[stepNumber] || []

  toCheck.forEach((name) => {
    const rules = fieldRules[name] || []
    for (const rule of rules) {
      const result = rule(form?.[name], form)
      if (result !== true) { 
        errors[name] = result
        break 
      }
    }
  })

  return errors
}

// Validation d'un champ individuel (ex: live validation)
export function validateField(name, form) {
  const rules = fieldRules[name] || []
  for (const rule of rules) {
    const result = rule(form?.[name], form)
    if (result !== true) return result
  }
  return null
}