export default function BlogForm(props) {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <label htmlFor="title">Title: </label>
                <input id="title"
                    type="text"
                    name="title"
                    value={props.blog.title}
                    onChange={props.handleFormChange}
                />
            </div>

            <div>
                <label htmlFor="author">Author: </label>
                <input id="author"
                    type="text"
                    name="author"
                    value={props.blog.author}
                    onChange={props.handleFormChange}
                />
            </div>

            <div>
                <label htmlFor="content">Content: </label>
                <textarea id="content"
                    name="content"
                    value={props.blog.content}
                    onChange={props.handleFormChange}
                />
            </div>

            <button type="submit">Submit</button>
        </form>
    )
}