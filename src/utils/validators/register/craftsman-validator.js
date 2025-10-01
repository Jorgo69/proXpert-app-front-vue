import { rulesFactory } from '../rules-factory'

// Règles spécifiques au formulaire artisan
const fieldRules = {
  // Règle conditionnelle pour NIP (Individuel)
  nip: [
    // La règle ne s'applique que si le type de compte est individuel
    (v, form) => (form.accountType === 'craftman_individual' 
                 ? rulesFactory.required('NIP requis')(v) 
                 : true)
  ],
  // Règle conditionnelle pour IFU (Entreprise)
  ifu: [
    // La règle ne s'applique que si le type de compte est entreprise
    (v, form) => (form.accountType === 'craftman_entreprise' 
                 ? rulesFactory.required('IFU requis')(v) 
                 : true)
  ],

  // Nom de l'entreprise (requis uniquement pour les entreprises)
  company_name: [
    (v, form) => (form.accountType === 'craftman_entreprise'
                 ? rulesFactory.required('Le nom de l\'entreprise est requis')(v) 
                 : true)
  ],
  
  // Registre de commerce (Document PDF, OPTIONNEL, mais si rempli, doit être PDF)
  commercial_register: [
    // La règle ne s'applique que si le compte est entreprise ET que le champ est rempli
    (v, form) => {
        if (form.accountType === 'craftman_entreprise' && v) {
            // Règle de validation de type de fichier (simulée ici)
            return rulesFactory.mimes('pdf', 'Le registre doit être un fichier PDF')(v);
        }
        return true;
    }
  ],
  
  // Documents supplémentaires (Array de PDF, OPTIONNEL, si rempli, doit respecter le format)
  documents: [
    // S'applique si le champ est rempli ET que le compte est entreprise
    (v, form) => {
        if (form.accountType === 'craftman_entreprise' && v && v.length > 0) {
            // Règle pour valider chaque document dans l'array (simulée)
            return Array.isArray(v) ? true : 'Les documents doivent être un array';
            // Vous devriez ici ajouter une boucle pour valider chaque fichier si nécessaire
        }
        return true;
    }
  ],
  
  // Image de profil (Optionnel, mais si rempli, doit être JPG/PNG)
  image: [
    (v) => {
        // La règle s'applique si le champ est rempli (indépendamment du type de compte)
        if (v) {
            // Règle de validation de type d'image (simulée)
            return rulesFactory.mimes('jpg,png', 'L\'image doit être JPG ou PNG')(v);
        }
        return true;
    }
  ],

  name: [ rulesFactory.required('Nom requis') ],
  firstname: [ rulesFactory.required('Prénom requis') ],
  email: [ rulesFactory.required('Email requis'), rulesFactory.email() ],
  telephone: [
    rulesFactory.required('Téléphone requis'),
    (v) => (/^\+?[\d\s]{8,20}$/.test(String(v || ''))) || 'Téléphone invalide'
  ],
  location: [ rulesFactory.required('Adresse requise') ],
  password: [ rulesFactory.required('Mot de passe requis'), rulesFactory.minLength(6) ],
  password_confirmation: [
    rulesFactory.required('Confirmation requise'),
    rulesFactory.matchField('password', 'Les mots de passe ne correspondent pas')
  ],

  // étape 2
  sector: [ rulesFactory.required('Sélectionnez un secteur') ],
  sub_sectors: [ rulesFactory.required('Sélectionnez un secteur') ],
  metier: [ rulesFactory.required('Métier requis') ],
  speciality: [ rulesFactory.required('Spécialité requise') ],

  // Année d'expérience (Obligatoire, mais avec un format strict 'integer')
  experience_year: [ 
    rulesFactory.required('Sélectionnez l\'expérience'),
    (v) => (Number.isInteger(Number(v))) || 'L\'année doit être un nombre entier'
  ],

  // Description (Optionnel, mais si rempli, doit être une string)
  description: [
    (v) => (v && typeof v !== 'string' ? 'La description doit être du texte' : true)
  ],

  // étape 3 (vérification SMS)
  verificationCode: [
    rulesFactory.required('Code de vérification requis'),
    rulesFactory.minLength(6, 'Le code doit comporter 6 chiffres')
  ],

  // étape 4 (abonnement)
  plan: [ rulesFactory.required('Choisissez un plan') ],
  // acceptConditions: [
  //   (v) => v === true || 'Vous devez accepter les conditions.'
  // ]
}

// Mapping des champs par étape
const fieldsByStep = {
  1: [
    'name','firstname','email','telephone','location',
    'password','password_confirmation', 
    'image',
    'nip', 'ifu'
  ],
  2: [
    'sector', 'sub_sectors',
    'speciality', 'experience_year', 'description',
    'commercial_register', 'company_name', 'documents',
    // 'secteur','metier','specialite','experience'
  ],
  3: ['verificationCode'],
  // 4: ['plan','acceptConditions']
}

// Validation d’une étape
export function validateStep(stepNumber, form) {
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

// Validation d’un champ individuel (ex: live validation)
export function validateField(name, form) {
  const rules = fieldRules[name] || []
  for (const rule of rules) {
    const result = rule(form?.[name], form)
    if (result !== true) return result
  }
  return null
}
