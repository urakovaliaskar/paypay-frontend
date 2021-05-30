import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './components/App';
import './registerServiceWorker';
import router from './router';
import store from './store';
import CenteredLoader from './components/global/CenteredLoader';
import './assets/style.scss';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);
Vue.component('centered-loader', CenteredLoader);

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
