import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Blog() {
    const [blog, setBlog] = useState({})
    const [errorMessage, setErrorMessage] = useState('')

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blogs/${id}`)
                setBlog(response.data)
            } catch (error) {
                console.warn(error)
                if (error.response) {
                    setErrorMessage(error.response.data.message)
                }
            }
        }
        fetchBlog()
    }, [id])

    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/blogs/${blog._id}`)
            navigate('/')
        } catch (error) {
            console.warn(error)
            if (error.response) {
                setErrorMessage(error.response.data.message)
            }
        }
    }

    return (
        <div>
            <p>{errorMessage}</p>

            <h1>{blog.title}</h1>

            <h3>By: {blog.author}</h3>

            <p>{blog.content}</p>

            {/* map comments possibly with comment component */}

            <Link to={`/blogs/${blog._id}/edit`}>Edit Post</Link>

            <button onClick={handleDelete}>Delete Post</button>
        </div>
    )
}