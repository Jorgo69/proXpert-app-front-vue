// validators.js
// Règles simples : chaque règle renvoie true (succès) ou un message d'erreur (string).
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

// Déclaration des règles par champ
const fieldRules = {
  nip: [ rulesFactory.required('NIPI/IFU requis') ], // npi: 10, ifu:13
  name: [ rulesFactory.required('Nom requis') ],
  firstname: [ rulesFactory.required('Prénom requis') ],
  email: [ rulesFactory.required('Email requis'), rulesFactory.email() ],
  telephone: [
    rulesFactory.required('Téléphone requis'),
    (v) => (/^\+?[\d\s]{8,20}$/.test(String(v || ''))) || 'Téléphone invalide',

  ],
  location: [ rulesFactory.required('Adresse requise') ],
  password: [ rulesFactory.required('Mot de passe requis'), rulesFactory.minLength(6) ],
  passwordConfirm: [
    rulesFactory.required('Confirmation requise'),
    rulesFactory.matchField('password', 'Les mots de passe ne correspondent pas')
  ],

  // étape 2
  secteur: [ rulesFactory.required('Sélectionnez un secteur') ],
  metier: [ rulesFactory.required('Métier requis') ],
  specialite: [ rulesFactory.required('Spécialité requise') ],
  experience: [ rulesFactory.required('Sélectionnez l\'expérience') ],

  // etape 3 [verification via code tel]
  verificationCode: [
  rulesFactory.required('Code de vérification requis'),
  rulesFactory.minLength(6, 'Le code doit comporter 6 chiffres')
],


  // étape 4
  plan: [ rulesFactory.required('Choisissez un plan') ],
  acceptConditions: [
  (v) => v === true || 'Vous devez accepter les conditions.'
]
}

// Valide les champs d'une étape : retourne un objet { fieldName: errorMessage, ... }
export function validateStep(stepNumber, form) {
  const fieldsByStep = {
    1: ['nipi','nom','prenom','email','telephone','adresse','password','passwordConfirm'],
    2: ['secteur','metier','specialite','experience'],
    3: ['verificationCode'],
    4: ['plan', 'acceptConditions'],
  }
  const errors = {}
  const toCheck = fieldsByStep[stepNumber] || []

  toCheck.forEach((name) => {
    const rules = fieldRules[name] || []
    for (const rule of rules) {
      const result = rule(form?.[name], form)
      if (result !== true) { errors[name] = result; break }
    }
  })

  return errors
}

// Valide un seul champ (pratique pour validation à la volée)
export function validateField(name, form) {
  const rules = fieldRules[name] || []
  for (const rule of rules) {
    const result = rule(form?.[name], form)
    if (result !== true) return result
  }
  return null
}
