import { createApp } from 'vue'
import './components/style/style.scss'
import App from './App.vue'
import router from './components/router'

import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import CoreuiVue from '@coreui/vue'
import '@coreui/coreui/dist/css/coreui.min.css'

const app = createApp(App)

app.config.globalProperties.$swal = Swal
app.use(router)
app.use(CoreuiVue)
app.mount('#app')
