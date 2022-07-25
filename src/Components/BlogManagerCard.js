import React, { useState, useEffect } from 'react';

const BlogManagerCard = (props) => {
    return (
        <div>
            <h3>
                BlogManagerCard
            </h3>
            <p>{props.blog.id}</p>
            <p>{props.blog.title}</p>
            <p>{props.blog.author}</p>
            <p>{props.blog.createdAt}</p>
            <p>{props.blog.lastModified}</p>

            <button onClick={async () => {
                await props.deleteBlog(props.blog.id)
            }}>Delete</button>

        </div>

    )
};

export default BlogManagerCard;