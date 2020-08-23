import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchUsers, showClear, clearUsers, setAlert }) => {
	const [text, setText] = useState('');

	const onSubmitHandler = event => {
		event.preventDefault();
		if (text === '') {
			setAlert('Please enter something', 'light');
		} else {
			searchUsers(text);
			setText('');
		}
	};

	const onChangeHandler = event => setText(event.target.value);

	return (
		<div>
			<form className='form' onSubmit={onSubmitHandler}>
				<input
					type='text'
					name='text'
					placeholder='Search users...'
					value={text}
					onChange={onChangeHandler}
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
};

Search.propTypes = {
	searchUsers: PropTypes.func.isRequired,
	clearUsers: PropTypes.func.isRequired,
	showClear: PropTypes.bool.isRequired,
	setAlert: PropTypes.func.isRequired,
};

export default Search;
