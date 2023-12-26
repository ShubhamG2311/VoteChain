import React from 'react';
import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { Buffer } from 'buffer';
import electionContract from "../artifacts/contracts/Election.sol/Election.json"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import contractAddress from "../contractAddress.json"
import Navbar from "./Navbar";
const axios = require('axios');
const ethers=require('ethers');

const pinataApiKey = '24e806647d4758016711';
const pinataApiSecret = 'c35658b3a9886f4e72e3bdd3b242aab6d4e16d7a3bb76ddebeef10b66076c3ca';

function ImageRegister() {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    
    // @ts-ignore
    window.Buffer = Buffer;

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
      }, [webcamRef]);

    const retake = () => {
    setImgSrc(null);
    };

    const onSubmit = async () => {
        try {
            const imageBuffer = Buffer.from(imgSrc.split(',')[1], 'base64');
            const blob = new Blob([imageBuffer], { type: 'image/jpeg' });

            const formData = new FormData();
            formData.append('file', blob, 'image.jpg');

            const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'pinata_api_key': pinataApiKey,
                'pinata_secret_api_key': pinataApiSecret,
            },
            });

            const provider = new ethers.BrowserProvider(window.ethereum);
            console.log(electionContract.abi);

            const signer = await provider.getSigner();

            const election = new ethers.Contract(contractAddress.contractAddress, electionContract.abi, signer);

            

            console.log('Pinata Upload Response:', response.data.IpfsHash);

            
        } catch (error) {
          console.error('Error uploading image to IPFS:', error);
        }
      };
      
      


    return (
        <div className="container">
        {imgSrc ? (
            <img src={imgSrc} alt="webcam" />
        ) : (
            <Webcam
          height={600}
          width={600}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          screenshotQuality={0.8}
        />
        )}
        <div className="btn-container">
            {imgSrc ? (
            <div>
            <button onClick={retake}>Retake photo</button>
            <button onClick={onSubmit}>Submit</button>
            </div>
            ) : (
            <button onClick={capture}>Capture photo</button>
            )}
        </div>
        </div>
    );
}

export default ImageRegister;
