import "./image_upload.scss";
import { useEffect, useState } from "react";
import axios from 'axios';

const ImageUpload = () => {
    const [images, setImages] = useState([]);

    const [inputFile, setInputFile] = useState();
    const [preview, setPreview] = useState();

    // Whenever the uploaded file is changed, it sets as a preview picture
    useEffect(() => {
        if (!inputFile) {
            setPreview(undefined);
            return;
        }

        const image_url = URL.createObjectURL(inputFile);
        setPreview(image_url);
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(image_url);
    }, [inputFile])

    const handleImageChange = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setInputFile(undefined);
            return
        }
        // this variable can be used for upload 
        setInputFile(e.target.files[0]);
        handleUpload(e.target.files[0]);
    }

    const handleUpload = async (input) => {
        const formData = new FormData();
        formData.append("photo", input, input.name)
        const result = await axios.post('https://httpbin.org/post', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log(result);
    }

    const getImages = async () => {
        const response = await axios.get('https://httpbin.org/image/jpeg', {
            responseType: 'blob' // specify response type as blob
        });
    
        const reader = new FileReader();
        reader.onload = () => {
            setImages(prevImages => [...prevImages, reader.result]);
        };
        reader.readAsDataURL(response.data);
    }
    


    return (
        <div className="image-upload">
            <div className="title">
                <div> Assest</div>

                <input type='file' id="photo" name="photo" onChange={handleImageChange} className="hide"/>
                <label htmlFor="photo"><i className="fa-solid fa-upload"></i></label>


            </div>
            <div className="search">
                <input type='text' />
                <i className="fas fa-search"></i> {/* Use the appropriate Font Awesome class for the magnifying glass icon */}
            </div>
            <div className="list">
                <button onClick={getImages}>Load Image</button>
                <div className="images-container">
                    {images && images.map((image, index) => (
                        <img key={index} src={image} alt={`Image ${index}`} />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default ImageUpload;