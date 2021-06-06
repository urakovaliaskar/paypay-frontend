import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginLayout from '@/components/layout/LoginLayout';
const BasicLayout = () =>
	import(
		/* webpackChunkName: "BasicLayout", webpackPreload: true */ '@/components/layout/BasicLayout'
	);
const Reviews = () =>
	import(
		/* webpackChunkName: "Reviews", webpackPrefetch: true */ '@/components/views/Reviews'
	);
const Review = () =>
	import(/* webpackChunkName: "Review" */ '@/components/views/Review');
const Users = () =>
	import(/* webpackChunkName: "Users" */ '@/components/views/Users');
const User = () =>
	import(/* webpackChunkName: "User" */ '@/components/views/User');

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
				path: '/review/:id',
				name: 'review',
				component: Review,
				meta: {
					title: 'Review',
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

			{
				path: '/user/:id',
				name: 'user',
				component: User,
				meta: {
					title: 'User',
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
