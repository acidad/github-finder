import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Search extends Component {
	state = {
		text: '',
	};

	static propTypes = {
		searchUsers: PropTypes.func.isRequired,
		clearUsers: PropTypes.func.isRequired,
		showClear: PropTypes.bool.isRequired,
	};

	onSubmitHandler = event => {
		event.preventDefault();
		this.props.searchUsers(this.state.text);
		this.setState({ text: '' });
	};

	onChangeHandler = event =>
		this.setState({ [event.target.name]: event.target.value });

	render() {
		const { showClear, clearUsers } = this.props;

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
				{showClear && (
					<button className='btn btn-light btn-block' onClick={clearUsers}>
						Clear
					</button>
				)}
			</div>
		);
	}
}

export default Search;
