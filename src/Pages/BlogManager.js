import React, { useState, useEffect } from 'react';
import BlogManagerCard from '../Components/BlogManagerCard';

const BlogManager = (props) => {
    return (
        <div>
            <h3>
                BlogManager
            </h3>
            {props.adminBlogList.message.map((blog) => {
                console.log(blog.title)
                return (
                    <BlogManagerCard blog={blog} deleteBlog={props.deleteBlog} />
                )
            })}
        </div>
    );
};

export default BlogManager;