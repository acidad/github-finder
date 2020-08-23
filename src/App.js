import React, { Component } from 'react';
import Axios from 'axios';

import NavBar from './components/layout/NavBar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import './App.css';

class App extends Component {
	state = {
		users: [],
		loading: false,
		alert: null,
	};

	searchUsers = async text => {
		this.setState({ loading: true });

		try {
			const res = await Axios.get('https://api.github.com/search/users', {
				params: {
					client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
					client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
					q: text,
				},
			});
			this.setState({ users: res.data.items, loading: false });
		} catch (err) {
			this.setState({ loading: false });
			console.log(err);
		}
	};

	clearUsers = () => {
		this.setState({ users: [], loading: false });
	};

	setAlert = (msg, type) => {
		this.setState({
			alert: {
				msg,
				type,
			},
		});

		setTimeout(() => this.setState({ alert: null }), 5000);
	};

	render() {
		const { users, loading } = this.state;

		return (
			<div className='App'>
				<NavBar />
				<div className='container'>
					<Alert alert={this.state.alert} />
					<Search
						searchUsers={this.searchUsers}
						clearUsers={this.clearUsers}
						showClear={users.length > 0 ? true : false}
						setAlert={this.setAlert}
					/>
					<Users users={users} loading={loading} />
				</div>
			</div>
		);
	}
}

export default App;
