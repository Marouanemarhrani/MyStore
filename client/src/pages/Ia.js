import React, { useState } from 'react';
import LayoutNF from '../components/Layout/LayoutNF';
import axios from 'axios';

const Ia = () => {
    const [image, setPhoto] = useState("");
    const [prediction, setPrediction] = useState("");

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const brandData = new FormData();
            brandData.append("image", image);

            // Send the form data using axios
            axios.post('http://localhost:8000/api/', brandData)
                .then(response => {
                    setPrediction(response.data.predicted_phone); // Set the prediction result
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        } catch (error) {
            console.error("Error while uploading image", error);
        }
    };

    return (
        <LayoutNF title={"Dashboard - Create Brand"}>
            <div className='cbrnd container-fluid'>
                <div className='cbrnd1 row'>
                    <label 
                        className='cbrnd7 btn btn-outline col-md-12'
                    >
                        {image ? image.name : "Upload Photo"}
                        <input 
                            type="file" 
                            name="image"
                            accept="image/*"
                            onChange={(e) => setPhoto(e.target.files[0])} 
                            hidden 
                        />
                    </label>
                    <div className='cbrnd17 mb-3'>
                        <button 
                            className='cbrnd18 btn'
                            onClick={handleCreate}
                        >
                            Test
                        </button>
                    </div>
                </div>
                
                {/* Display the prediction result if available */}
                {prediction && (
                    <div className='prediction-result'>
                        <h2>Predicted Phone:</h2>
                        <p>{prediction}</p>
                    </div>
                )}
            </div>
        </LayoutNF>
    );
};

export default Ia;
