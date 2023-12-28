import React from 'react';
import Webcam from "react-webcam";
import { useCallback, useRef, useState, useEffect } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { Buffer } from 'buffer';
import electionContract from "../artifacts/contracts/Election.sol/Election.json"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import contractAddress from "../contractAddress.json";
import Navbar from "./Navbar";
import * as faceapi from 'face-api.js';
const axios = require('axios');
const ethers=require('ethers');

const pinataApiKey = '24e806647d4758016711';
const pinataApiSecret = 'c35658b3a9886f4e72e3bdd3b242aab6d4e16d7a3bb76ddebeef10b66076c3ca';

function ImageRegister() {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const selfieRef = useRef();
    const isFirstRender = useRef(true);

    useEffect(() => {
        (async () => {
          await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
          await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
          await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
          await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
          await faceapi.nets.faceExpressionNet.loadFromUri('/models');
        })();
      }, []);

    const navigate = useNavigate();
    
    // @ts-ignore
    window.Buffer = Buffer;

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
      }, [webcamRef]);

    const retake = () => {
    setImgSrc(null);
    };

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    const loadImage = async (src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous'; // Add this line if images are hosted on a different domain
          img.onload = () => resolve(img);
          img.onerror = (error) => reject(error);
          img.src = src;
        });
      };

    const onSubmit = async () => {
        try {
            const imageBuffer = Buffer.from(imgSrc.split(',')[1], 'base64');
            const blob1 = new Blob([imageBuffer], { type: 'image/jpeg' });
            const imageUrl1 = URL.createObjectURL(blob1);
            const img1 = await loadImage(imageUrl1);

            const formData = new FormData();
            formData.append('file', blob1, 'image.jpg');

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

            const accounts = await window.ethereum.request({ method: "eth_accounts" });

            console.log(accounts[0]);

            const originalHash = await election.getIpfsHash(accounts[0]);

            console.log(originalHash);

            try {
                const response = await fetch(`https://gateway.pinata.cloud/ipfs/${originalHash}`);
                
                if (response.ok) {
                    // console.log(response);
                    const blob2 = await response.blob();
                    const imageUrl2 = URL.createObjectURL(blob2);

                    
                    const img2 = await loadImage(imageUrl2);


                    const face1 = await faceapi.detectSingleFace(img1,
                    new faceapi.TinyFaceDetectorOptions())
                    .withFaceLandmarks().withFaceDescriptor();

                    // detect a single face from the selfie image
                    const face2 = await faceapi.detectSingleFace(img2,
                    new faceapi.TinyFaceDetectorOptions())
                    .withFaceLandmarks().withFaceDescriptor();

                    console.log(face1);
                    console.log(face2);
                    

                    if (face1 && face2) {
                    // Using Euclidean distance to compare face descriptions
                        const distance = faceapi.euclideanDistance(face1.descriptor, face2.descriptor);
                        console.log(distance);
                    }
                } else {
                  console.error('Failed to fetch image');
                }
              } catch (error) {
                console.error('Error fetching image:', error);
              }

            
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
