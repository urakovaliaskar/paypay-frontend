import Vue from 'vue';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueI18n from 'vue-i18n';
import App from './components/App';
import './registerServiceWorker';
import router from './router';
import store from './store';
import CenteredLoader from './components/global/CenteredLoader';
import './assets/style.scss';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueAxios, axios);
Vue.use(VueI18n);
Vue.component('centered-loader', CenteredLoader);

router.beforeEach((to, from, next) => {
	const { isAuthenticated, isAdmin } = store.getters;
	if (isAuthenticated) {
		if (to.meta.forAuth) {
			if (to.meta.forAdmin && isAdmin) {
				next();
			} else if (to.meta.forAdmin && !isAdmin) {
				next(from);
			} else {
				next();
			}
		} else {
			next(from);
		}
	} else {
		if (to.meta.forAuth) {
			next({ name: 'login' });
		} else {
			next();
		}
	}
});

if (localStorage?.token) {
	Vue.axios.defaults.headers.common['Authorization'] =
		'Bearer ' + localStorage?.token;
	store.commit('SET_CURRENT_USER', JSON.parse(localStorage?.user));
	store.commit('SET_TOKEN', localStorage?.token);
}

Vue.axios.defaults.baseURL = '/api/v1';

document.title = 'Performance Review';

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
