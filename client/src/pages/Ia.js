import React, { useState } from 'react';
import LayoutNF from '../components/Layout/LayoutNF';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import './Ia.css';

const Ia = () => {
    const [image, setPhoto] = useState(null);
    const [prediction, setPrediction] = useState("");
    const [estimatedPrice, setEstimatedPrice] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [userOffer, setUserOffer] = useState("");

    // Handle offer creation
    const handleCreate = async (e) => {
        e.preventDefault();
        
        if (!prediction || !estimatedPrice || !image) {
            alert("Please upload a photo and get the estimated price first.");
            return;
        }
        
        try {
            const offerData = new FormData();
            // Append the values generated from the handleTest function
            offerData.append("deviceName", prediction);  // Predicted phone name
            offerData.append("estimatedPrice", estimatedPrice);  // Estimated price
            offerData.append("phoneNumber", phoneNumber);  // User's phone number
            offerData.append("userOffer", userOffer);  // User's offer price
            offerData.append("photo", image);  // The uploaded photo
    
            // Send the form data using axios
            const response = await axios.post(`${process.env.REACT_APP_API}/api/sells/create`, offerData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            alert('Offer submitted successfully!');
            setShowModal(false);  // Close the modal on success
        } catch (error) {
            console.error('There was an error!', error);
        }
    };
    
    // Handle image upload and prediction request
    const handleTest = async (e) => {
        e.preventDefault();
        try {
            const brandData = new FormData();
            brandData.append("image", image);

            // Send the form data using axios
            const response = await axios.post('http://localhost:8000/api/', brandData);
            const predictedPhone = response.data.predicted_phone;
            setPrediction(predictedPhone);
            
            // Set the estimated price based on the predicted phone
            let price = null;
            if (predictedPhone.toLowerCase() === "macbook") {
                price = 500;
            } else if (predictedPhone.toLowerCase() === "iphone") {
                price = 200;
            } else if (predictedPhone.toLowerCase() === "samsung") {
                price = 100;
            }

            setEstimatedPrice(price);
        } catch (error) {
            console.error('There was an error uploading the image!', error);
        }
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <LayoutNF title={"Dashboard - Make Offer"}>
            <div className='device-estimation-container container-fluid'>
                <h1 className='device-estimation-title'>Make Estimations for Your Devices</h1>
                
                <div className='image-upload-section row'>
                    <label className='image-upload-label btn btn-outline col-md-12'>
                        {image ? image.name : "Upload Photo"}
                        <input 
                            type="file" 
                            name="image"
                            accept="image/*"
                            onChange={(e) => setPhoto(e.target.files[0])} 
                            hidden 
                        />
                    </label>
                    <div className='submit-button-container mb-3'>
                        <button className='test-button btn' onClick={handleTest}>
                            Test
                        </button>
                    </div>
                </div>

                <div className="guide-images-section row">
                    <div className="guide-image-container col-md-6">
                        <img src='/path-to-guide-image-1.jpg' alt="Guide to take image 1" className='guide-image' />
                    </div>
                    <div className="guide-image-container col-md-6">
                        <img src='/path-to-guide-image-2.jpg' alt="Guide to take image 2" className='guide-image' />
                    </div>
                </div>

                {prediction && (
                    <div className='prediction-result'>
                        <h2 className='predicted-phone-title'>Predicted Phone: {prediction}</h2>
                        {estimatedPrice && (
                            <p className='estimated-price'>Estimated Price: {estimatedPrice} EUR</p>
                        )}
                        <button className="show-modal-button btn btn-primary" onClick={handleShowModal}>
                            Make Offer
                        </button>
                    </div>
                )}

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Device Estimation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label>Device Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={prediction} 
                                disabled 
                            />
                        </div>
                        <div className="form-group">
                            <label>Estimated Price</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={`${estimatedPrice} EUR`} 
                                disabled 
                            />
                        </div>
                        <div className="form-group uploaded-photo-container">
                            <label>Uploaded Photo</label>
                            {image && (
                                <img 
                                    src={URL.createObjectURL(image)} 
                                    alt="Uploaded" 
                                    className='uploaded-photo'
                                />
                            )}
                        </div>
                        <div className="form-group">
                            <label>Your Offer</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                placeholder="Enter your offer price"
                                value={userOffer}
                                onChange={(e) => setUserOffer(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Enter your phone number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleCreate}>
                            Submit Offer
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </LayoutNF>
    );
};

export default Ia;
