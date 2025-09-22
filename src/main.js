import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 1. Importer le routeur
import router from './router'

// 2. Importer l'instance i18n que vous avez exportée
import i18n from './i18n' 

// Créer l'application
const app = createApp(App)

// 3. Utiliser le routeur et l'instance i18n
app.use(router)
app.use(i18n)

// Monter l'application
app.mount('#app')

// createApp(App).mount('#app')
