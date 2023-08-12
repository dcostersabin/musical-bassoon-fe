import { lazy } from 'react';
import {useRoutes} from 'react-router-dom';
import GuestGuard from '../guards/guest.guard';
import UserGuard from '../guards/user.guard';
import GuestLayout from '../layouts/guest';
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import Home from '../pages/dashboard/home';
import UserLayout from '../layouts/user';
import HomePage from "../pages/home";

const Router = () =>
	useRoutes([
		{
			path: '/',
			element: <GuestLayout />,
			children: [{element: <HomePage/>, index: true}],
		},

		{
			path: '/auth',
			element: (
				<GuestGuard>
					<GuestLayout />
				</GuestGuard>
			),
			children: [
				{element: <Login />, index: true},
				{element: <Login />, path: 'login'},
				{element: <Register />, path: 'register'},
			],
		},
		{
			path: '/dashboard',
			element: (
				<UserGuard>
					<UserLayout />
				</UserGuard>
			),
			children: [
				{element: <Home />, index: true},
				{element: <Home />, path: 'home'},
			],
		},
	]);

export default Router;
