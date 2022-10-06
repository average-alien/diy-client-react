import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

export default function Comment(props) {
    const [newComment, setNewComment] = useState({ content: '' })
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    const handleFormChange = e => {
        setNewComment({ ...newComment, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        try {
            e.preventDefault()
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/blogs/${props.blogId}/comments`, newComment)
            navigate(`/blogs/${response.data._id}`)
        } catch (error) {
            console.warn(error)
            if (error.response) {
                setErrorMessage(error.response.data.message)
            }
        }
    }

    return (
        <div>
            <h4>Comments</h4>

            <p>{errorMessage}</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor='comment'>New comment: </label>
                <input id='comment'
                    type='text'
                    name='content'
                    value={newComment.content}
                    onChange={handleFormChange}
                />
                <button type='submit'>Post</button>
            </form>

            <ul>

            </ul>
        </div>
    )
}