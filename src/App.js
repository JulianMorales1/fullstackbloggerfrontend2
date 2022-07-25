import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { Routes, Route } from 'react-router-dom';
import BlogsPage from './Pages/Blogs';
import PostBlog from './Pages/PostBlog';
import BlogManager from './Pages/BlogManager';

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
	const [adminBlogList, setAdminBlogList] = useState({
		message: []
	});
	const [adminBlogsLoading, setAdminBlogsLoading] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	// post blog here
	const blogSubmit = async (blog) => {
		console.log(blog, 'blog here');
		setIsLoading(true)
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
		setIsLoading(false)
	};

	const deleteBlog = async (blogId) => {
		setAdminBlogsLoading(true)
		const url = `${urlEndpoint}/admin/delete-blog/${blogId}`
		const response = await fetch(url, {
			method: 'DELETE'
		});
		const responseJSON = await response.json();
		setAdminBlogsLoading(false)
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
	}, [sortField, sortOrder, filteredField, filteredValue, limit, page, isLoading]);

	useEffect(() => {
		const fetchAdminBlogList = async () => {
			const apiResponse = await fetch(`${urlEndpoint}/admin/blog-list`);
			const json = await apiResponse.json();
			console.log("fetchAdminBlogList ", json)
			setAdminBlogList(json);
			return json;
		}
		fetchAdminBlogList()
	}, [adminBlogsLoading]);

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
				<Route path="/blog-manager" element={<BlogManager
					adminBlogList={adminBlogList}
					deleteBlog={deleteBlog}
				/>}></Route>
			</Routes>
		</div>
	);
}

export default App;
