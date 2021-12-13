import { useState } from "react";
import Select from 'react-select';
import postService from '../../../services/post.service';
import fileService from "../../../services/file.service";

function AddPost({ refreshPost, userId }) {

    const actions = [
        { label: "question", value: 1 },
        { label: "showing off", value: 2 },
        { label: "just sharing", value: 3 },
        { label: "help", value: 4 }
    ]

    const [postText, setPostText] = useState("");
    const [postImage, setPostImage] = useState("");
    const handlePostImage = async (e) => {
        try {
            const uploadData = new FormData();
            uploadData.append("image", e.target.files[0])
            const response = await fileService.uploadImage(uploadData);
            setPostImage(response.data.secure_url);
        } catch (error) {
            console.log(error)
        }
    }
    const handleTextPost = (e) => setPostText(e.target.value);
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const requestBody = { postText, postImage, createdBy: userId }

            const response = await postService.createPost(requestBody, userId);
            setPostText("");


            refreshPost(response);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <h4>Create a post here</h4>
            <form onSubmit={handleSubmit}>
                <label>Tag:</label>
                <Select options={actions} />
                <label>Text</label>
                <input type="text" name="postText" value={postText} onChange={handleTextPost} />

                <label>Add a pic</label>
                <input type="file" onChange={handlePostImage} />

                <button type="submit">Post it</button>
            </form>
        </div>
    );
}

export default AddPost;