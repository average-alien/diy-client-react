import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Home() {
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blogs`)
                setBlogs(response.data)
            } catch (error) {
                console.warn(error)
                if (error.response) {
                    setErrorMessage(error.response.data.message)
                }
            }
        }
        fetchBlogs()
    }, [])

    return (
        <div>
            <h1>Welcome to my Blog</h1>

            <p>{errorMessage}</p>

            {blogs.map(blog => {
                return (
                    <h2 key={blog._id}>
                        <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
                    </h2>
                )
            })}
        </div>
    )
}