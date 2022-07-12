import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { Routes, Route } from 'react-router-dom';
import BlogsPage from './Pages/Blogs';
import PostBlog from './Pages/PostBlog';

const urlEndpoint = 'http://localhost:4000';

function App() {
	const [serverJSON, setServerJSON] = useState({ message: null });

	// for blogs page

	const [sortField, setSortField] = useState('');
	const [sortOrder, setSortOrder] = useState('ASC');
	const [filteredField, setFilterField] = useState('');
	const [filteredValue, setFilteredValue] = useState('');
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);

	// post blog here
	const blogSubmit = async (blog) => {
		console.log(blog, 'blog here');
		const url = `${urlEndpoint}/blogs/blog-submit`;
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(blog),
		});
		const responseJSON = await response.json();
	};

	useEffect(() => {
		console.log('running again ', filteredField);
		const fetchData = async () => {
			const url = `${urlEndpoint}/blogs/all-blogs?sortField=${sortField}&sortOrder=${sortOrder}&filterField=${filteredField}&filterValue=${filteredValue}&limit=${limit}&page=${page}`;
			const apiResponse = await fetch(url);
			const apiJSON = await apiResponse.json();
			setServerJSON(apiJSON);
			return;
		};
		fetchData();
	}, [sortField, sortOrder, filteredField, filteredValue, limit, page]);
	return (
		<div className='App'>
			<Routes>
				<Route
					index
					element={
						<BlogsPage
							message={serverJSON.message}
							blogSubmit={blogSubmit}
							sortField={sortField}
							setSortField={setSortField}
							sortOrder={sortOrder}
							setSortOrder={setSortOrder}
							filteredField={filteredField}
							setFilteredField={setFilterField}
							filteredValue={filteredValue}
							setFilteredValue={setFilteredValue}
							limit={limit}
							setLimit={setLimit}
							page={page}
							setPage={setPage}
						/>
					}
				></Route>

				<Route
					path='/blog-submit'
					element={<PostBlog blogSubmit={blogSubmit} />}
				></Route>
			</Routes>
		</div>
	);
}

export default App;
