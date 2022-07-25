import React from 'react';

import { Link } from 'react-router-dom'

/*

	const [sortField, setSortField] = useState('');
	const [sortOrder, setSortOrder] = useState('ASC');
	const [filteredField, setFilterField] = useState('');
	const [filteredValue, setFilteredValue] = useState('');
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);

*/
const BlogsPage = ({
	message,
	sortField,
	setSortField,
	sortOrder,
	setSortOrder,
	filteredField,
	setFilteredField,
	filteredValue,
	setFilteredValue,
	limit,
	setLimit,
	page,
	setPage,
}) => {
	console.log("server message ", message)
	return (
		<div>
			<h1>Blogs Page</h1>
			<Link to='/blog-submit'>Submit Blog</Link>
			<Link to='/blog-manager'>Blogs manager</Link>

			<div className='blogs-input'>
				<select onChange={(event) => setSortField(event.target.value)}>
					<option value='title'>Title</option>
					<option value='author'>Author</option>
					<option value='createdAt'>CreatedAt</option>
				</select>

				<select onChange={(event) => setSortOrder(event.target.value)}>
					<option value='ASC'>ASC</option>
					<option value='DESC'>DESC</option>
				</select>

				<select onChange={(event) => setFilteredField}>
					<option value='title'>Title</option>
					<option value='author'>Author</option>
				</select>

				<input
					type='text'
					placeholder='Filtered Value'
					onChange={(event) => setFilteredValue(event.target.value)}
				/>
				<input
					type='number'
					placeholder='Limit'
					onChange={(event) => setLimit(event.target.value)}
				/>
				<input
					type='number'
					placeholder='Page'
					onChange={(event) => setPage(event.target.value)}
				/>
			</div>
			<h2>
				Server Message:

			</h2>
			{message != null &&
				message.map((blog) => {
					return (<div><h3>{blog.title}</h3><p>{blog.text}</p></div>);
				})}
		</div>
	);
};

export default BlogsPage;
