import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostBlog = (props) => {
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [author, setAuthor] = useState('');

	const submitHandler = (event) => {
		event.preventDefault();

		const newBlogPost = {
			title: title,
			text: text,
			author: author,
			date: Date.now(),
			id: Math.floor(Math.random() * (1000 - 1)) + 1,
		};

		props.blogSubmit(newBlogPost);
		navigate('/');
	};

	return (
		<div>
			<form onSubmit={submitHandler}>
				<h2>Submt a new blog</h2>

				<label htmlFor='title'>Blog Title</label>
				<input type='text' onChange={(event) => setTitle(event.target.value)} />
				<label htmlFor='author'>Author</label>
				<input
					type='text'
					onChange={(event) => setAuthor(event.target.value)}
				/>
				<label htmlFor='text'>Text</label>
				<input type='text' onChange={(event) => setText(event.target.value)} />

				<button type='submit'>Submit</button>
			</form>
		</div>
	);
};

export default PostBlog;
