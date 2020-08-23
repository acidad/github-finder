import React, { useState, Fragment } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from './components/layout/NavBar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import './App.css';

const App = () => {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({});
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);

	// Search Github users
	const searchUsers = async text => {
		setLoading(true);

		try {
			const res = await Axios.get('https://api.github.com/search/users', {
				params: {
					client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
					client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
					q: text,
				},
			});
			setUsers(res.data.items);
			setLoading(false);
		} catch (err) {
			setLoading(false);
			console.log(err);
		}
	};

	// Get single Github user
	const getUser = async username => {
		setLoading(true);

		try {
			const res = await Axios.get(`https://api.github.com/users/${username}`, {
				params: {
					client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
					client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
				},
			});

			setUser(res.data);
			setLoading(false);
		} catch (err) {
			setLoading(false);
			console.log(err);
		}
	};

	// Get user's repos
	const getUserRepos = async username => {
		setLoading(true);

		try {
			const res = await Axios.get(
				`https://api.github.com/users/${username}/repos`,
				{
					params: {
						client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
						client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
						per_page: 5,
						sort: 'created:asc',
					},
				}
			);

			setRepos(res.data);
			setLoading(false);
		} catch (err) {
			setLoading(false);
			console.log(err);
		}
	};

	// Clear Users
	const clearUsers = () => {
		setUsers([]);
		setLoading(false);
	};

	// Set Alert
	const showAlert = (msg, type) => {
		setAlert({ msg, type });
		setTimeout(() => setAlert(null), 5000);
	};

	return (
		<Router>
			<div className='App'>
				<NavBar />
				<div className='container'>
					<Alert alert={alert} />
					<Switch>
						<Route
							exact
							path='/'
							render={() => (
								<Fragment>
									<Search
										searchUsers={searchUsers}
										clearUsers={clearUsers}
										showClear={users.length > 0 ? true : false}
										setAlert={showAlert}
									/>
									<Users users={users} loading={loading} />
								</Fragment>
							)}
						/>
						<Route exact path='/about' component={About} />
						<Route
							exact
							path='/user/:login'
							render={props => (
								<User
									{...props}
									getUser={getUser}
									getUserRepos={getUserRepos}
									user={user}
									repos={repos}
									loading={loading}
								/>
							)}
						/>
					</Switch>
				</div>
			</div>
		</Router>
	);
};

export default App;
