import { rulesFactory } from '../rules-factory'

// Règles spécifiques au formulaire artisan
const fieldRules = {
  // ========== ÉTAPE 1 ==========
  
  name: [ 
    rulesFactory.required('Nom requis') 
  ],
  
  firstname: [ 
    rulesFactory.required('Prénom requis') 
  ],
  
  // Règle conditionnelle pour npi (Individuel uniquement)
  npi: [
    (v, form) => (form.accountType === 'craftsman_individual' 
                 ? rulesFactory.required('npi requis')(v) 
                 : true)
  ],
  
  // Règle conditionnelle pour IFU (Entreprise uniquement)
  ifu: [
    (v, form) => (form.accountType === 'craftsman_entreprise' 
                 ? rulesFactory.required('IFU requis')(v) 
                 : true)
  ],
  
  // Image de profil (Optionnel, mais si rempli, doit être JPG/PNG)
  image: [
    (v) => {
      if (v && Array.isArray(v) && v.length > 0) {
        const file = v[0]; // Prendre le premier fichier
        if (!file.type.match(/image\/(jpeg|jpg|png)/i)) {
          return 'L\'image doit être JPG ou PNG';
        }
      }
      return true;
    }
  ],
  
  email: [ 
    rulesFactory.required('Email requis'), 
    rulesFactory.email() 
  ],
  
  // Téléphone (10 chiffres pour le Bénin)
  telephone: [
    rulesFactory.required('Téléphone requis'),
    (v) => {
      const phone = String(v || '').trim();
      // Accepte 10 chiffres (format local) ou +229 suivi de 10 chiffres
      return (/^(\+229)?[0-9]{10}$/.test(phone)) || 'Téléphone invalide (10 chiffres requis)';
    }
  ],
  
  // Location (Optionnel)
  location: [
    (v) => {
      if (v && String(v).trim() !== '') {
        return String(v).length >= 3 || 'L\'adresse doit contenir au moins 3 caractères';
      }
      return true;
    }
  ],
  
  password: [ 
    rulesFactory.required('Mot de passe requis'), 
    rulesFactory.minLength(6) 
  ],
  
  password_confirmation: [
    rulesFactory.required('Confirmation requise'),
    rulesFactory.matchField('password', 'Les mots de passe ne correspondent pas')
  ],

  // ========== ÉTAPE 2 ==========
  
  // Nom de l'entreprise (requis uniquement pour les entreprises)
  company_name: [
    (v, form) => (form.accountType === 'craftsman_entreprise'
                 ? rulesFactory.required('Le nom de l\'entreprise est requis')(v) 
                 : true)
  ],
  
  // Secteur
  sector: [ 
    rulesFactory.required('Sélectionnez un secteur') 
  ],
  
  // Sous-secteur
  // Sous-secteurs (Array - au moins un sous-secteur requis)
  sub_sectors: [
    rulesFactory.required('Sélectionnez au moins un sous-secteur'),
    (v) => {
      if (!Array.isArray(v)) {
        return 'Les sous-secteurs doivent être un tableau';
      }
      return v.length > 0 || 'Sélectionnez au moins un sous-secteur';
    }
  ],
  
  // Ville
  city: [ 
    rulesFactory.required('Ville requise') 
  ],
  
  // Spécialité (Optionnel)
  speciality: [
    (v) => {
      if (v && String(v).trim() !== '') {
        return String(v).length >= 3 || 'La spécialité doit contenir au moins 3 caractères';
      }
      return true;
    }
  ],
  
  // Registre de commerce (Document PDF, OPTIONNEL pour entreprise, mais si rempli doit être PDF)
  commercial_register: [
    (v, form) => {
      if (form.accountType === 'craftsman_entreprise' && v && v.length > 0) {
        // C'est un tableau de fichiers
        if (!Array.isArray(v)) {
          return 'Le registre doit être un tableau';
        }
        return rulesFactory.mimes('pdf', 'Le registre doit être un fichier PDF')(v[0]);
      }
      return true;
    }
  ],
  
  // Documents supplémentaires (Array de PDF, OPTIONNEL pour entreprise)
  documents: [
    (v, form) => {
      if (form.accountType === 'craftsman_entreprise' || form.accountType === 'craftsman_individual'  && v && Array.isArray(v) && v.length > 0) {
        if (!Array.isArray(v)) {
          return 'Les documents doivent être un tableau';
        }

         for (let i = 0; i < v.length; i++) {
          if (!v[i].type.match(/application\/pdf/i)) {
            return `Le document ${i + 1} doit être un fichier PDF`;
          }
        }

        // Valider que chaque document est un PDF
        // for (let i = 0; i < v.length; i++) {
        //   const result = rulesFactory.mimes('pdf', `Le document ${i + 1} doit être un fichier PDF`)(v[i]);
        //   if (result !== true) return result;
        // }
      }
      return true;
    }
  ],
  
  // Année d'expérience (Obligatoire)
  experience: [ 
    rulesFactory.required('Sélectionnez l\'expérience'),
    (v) => (Number.isInteger(Number(v)) && Number(v) >= 0) || 'L\'expérience doit être un nombre entier positif'
  ],

  // ========== ÉTAPE 3 (Vérification SMS) ==========
  
  verificationCode: [
    rulesFactory.required('Code de vérification requis'),
    rulesFactory.minLength(6, 'Le code doit comporter 6 chiffres'),
    (v) => (/^[0-9]{6}$/.test(String(v || ''))) || 'Le code doit contenir exactement 6 chiffres'
  ],

  // ========== ÉTAPE 4 (Abonnement) ==========
  
  plan: [ 
    rulesFactory.required('Choisissez un plan') 
  ]
}

// Mapping des champs par étape
// IMPORTANT: Étapes 1 et 2 sont validées ensemble avant l'appel à /register
const fieldsByStep = {
  1: [
    'name',
    'firstname',
    'npi',                 // Conditionnel (individual)
    'ifu',                 // Conditionnel (entreprise)
    'image',               // Optionnel
    'email',
    'telephone',
    'location',            // Optionnel
    'password',
    'password_confirmation'
  ],
  2: [
    'company_name',        // Conditionnel (entreprise)
    'sector',
    'sub_sectors',          // Corrigé: sub_sectors au lieu de sub_sectorss
    'city',
    'speciality',          // Optionnel
    'commercial_register', // Conditionnel (entreprise) et Optionnel
    'documents',           // Conditionnel (entreprise) et Optionnel
    'experience'
  ],
  3: [
    'verificationCode'     // Code à 6 chiffres reçu par SMS
  ],
  4: [
    'plan'
  ]
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

// Fonction helper pour valider les étapes 1 et 2 ensemble (avant /register)
export function validateSteps1And2(form) {
  const errors = {}
  
  // Valider étape 1
  const step1Errors = validateStep(1, form)
  Object.assign(errors, step1Errors)
  
  // Valider étape 2
  const step2Errors = validateStep(2, form)
  Object.assign(errors, step2Errors)
  
  return errors
}