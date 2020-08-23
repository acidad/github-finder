import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Search extends Component {
	state = {
		text: '',
	};

	onSubmitHandler = event => {
		event.preventDefault();
		this.props.searchUsers(this.state.text);
		this.setState({ text: '' });
	};

	onChangeHandler = event =>
		this.setState({ [event.target.name]: event.target.value });

	render() {
		return (
			<div>
				<form className='form' onSubmit={this.onSubmitHandler}>
					<input
						type='text'
						name='text'
						placeholder='Search users...'
						value={this.state.text}
						onChange={this.onChangeHandler}
					/>
					<input
						type='submit'
						value='search'
						className='btn btn-dark btn-block'
					/>
				</form>
			</div>
		);
	}
}

Search.propTypes = {
	searchUsers: PropTypes.func.isRequired,
};

export default Search;
