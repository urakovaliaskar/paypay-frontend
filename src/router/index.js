import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginLayout from '@/components/layout/LoginLayout';
import BasicLayout from '@/components/layout/BasicLayout';
import Reviews from '@/components/views/Reviews';
import Users from '@/components/views/Users';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: BasicLayout,
		meta: {
			title: 'Home',
			forAuth: true,
		},
		children: [
			{
				path: '/',
				redirect: '/reviews', // default child path
			},
			{
				path: '/reviews',
				name: 'reviews',
				component: Reviews,
				meta: {
					title: 'Reviews',
					forAuth: true,
				},
			},
			{
				path: '/users',
				name: 'users',
				component: Users,
				meta: {
					title: 'Users',
					forAuth: true,
					forAdmin: true,
				},
			},
		],
	},
	{
		path: '/login',
		name: 'login',
		component: LoginLayout,
		meta: {
			title: 'Sign In',
			forAuth: false,
		},
	},

	{
		path: '*',
		redirect: '/',
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
