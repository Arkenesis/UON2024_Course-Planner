import "./image_upload.scss";
import { useEffect, useState } from "react";
import upload from "../../assets/upload.png";
import axios from 'axios';
import { instance } from "../../App";

const ImageUpload = ({setImageUrl}) => {
    const [images, setImages] = useState([]);
    const [inputFile, setInputFile] = useState();
    const [preview, setPreview] = useState();
    const [err, setErr] = useState('');

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
            return;
        }
        // this variable can be used for upload 
        setInputFile(e.target.files[e.target.files.length-1]);
        handleUpload(e.target.files);
    }

    const handleUpload = async (input) => {
        let formData = new FormData();
        for(let i=0; i<input.length; i++){
            formData.append("files", input[i]);
        }
        try{
            const { data } = await instance.post('/pages/image-upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            console.log(data.message);
        }
        catch(error){
            if(error.response?.data.error){
                setErr(error.response?.data.error)
            }
            else{
                setErr("Try to upload again, only jpeg|jpg|png|gif|svg can be accepted.")
            }
        }
        getData();
    }


    useEffect(() => {
        getData()
    },[])

    const getData = async () => {
        try{
            const { data } = await instance.get("/pages/image-upload");
            setImages(data.files);
        }
        catch(error){
            console.log(error);
        }
    }

    // const getImages = async () => {
    //     const response = await axios.get('https://httpbin.org/image/jpeg', {
    //         responseType: 'blob' // specify response type as blob
    //     });
    
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //         setImages(prevImages => [...prevImages, reader.result]);
    //     };
    //     reader.readAsDataURL(response.data);
    // }

    const [search, setSearch] = useState('');
    const handleSearch = (e) => {
        setSearch(() => e.target.value);
    };

    return (
        <div className="image-upload">
            <div className="title">
                <div className="assetNameDiv">
                    <div className="assetName"> Assets</div>

                    {/* <input type='file' id="photo[]" name="photo[]" onChange={handleImageChange} className="hide" multiple="multiple"/> */}
                    <input type="file" multiple accept="image/*" onChange={handleImageChange} name="files[]" id="files"/>
                </div>
                <div className="uploadImage">
                    <label htmlFor="files">
                        <img src={upload} alt="Upload Icon" className="upload-icon" />
                    </label>
                </div>
                <div className="errorMessage">
                    {err && <p>{err}</p>}
                </div>

            </div>
            <div className="search">
                <input type='text' onChange={handleSearch}/>
                <i className="fas fa-search"></i> {/* Use the appropriate Font Awesome class for the magnifying glass icon */}
            </div>
            <div className="list">
                {/* <button onClick={getImages}>Load Image</button> */}
                <div className="images-container">
                    {setImageUrl 
                    ? (images && images.filter(image => image.name.includes(search)).map((image, index) => (
                        <div key={index}>
                            <img src={image.url} alt={`Image ${index}`} onClick={() => setImageUrl(image.url)}/>
                            <span>{image.name}</span>
                        </div>
                    )))
                    : (images && images.filter(image => image.name.includes(search)).map((image, index) => (
                        <div className="oneAsset" key={index}>
                            <img src={image.url} alt={`Image ${index}`}/>
                        </div>
                    )))
                }
                </div>
            </div>

        </div>
    )
}

export default ImageUpload;