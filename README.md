# VoteChain - Secure Online Voting System based on Blockchain Technology

## Introduction
The existing voting systems face challenges related to security, transparency, and user authentication. This project aims to address these issues by implementing a secure online voting system using blockchain technology, ensuring a tamper-resistant and transparent electoral process. We have developed a web portal using Ethereum Blockchain Technology for solving this problem. We have included different features and levels of security to ensure security, transparency and avoid any types of attacks such as Phishing attacks and Smart Contract attacks. The App is almost completely decentralized while there is only admin with centralized access to administer the election. While we have worked on user-friendly experience and UI, our main focus relies on solving the security issues that exist in few online voting system such as OmniBallot, Voatz etc.

![The new way to transfer](https://github.com/ShubhamG2311/VoteChain/assets/77164706/73c0d560-aa7f-4ede-900b-dbd489890274)


## Problem Statement
The blockchain is an emerging, decentralized, and distributed technology that promises to enhance different aspects of many industries. Expanding e-voting into blockchain technology could be the solution to alleviate the present concerns in e-voting. Generally speaking, following issues are most commonly faced in any traditional or e-voting system:
- Declining Voter Turnout
- Security and Fraud
- Privacy and Confidentiality
- Centralized Control
- Cost and Efficiency

## Features

### Security
- Ethereum Blockchain: Data stored on a secure, decentralized ledger, resistant to fraud and manipulation.
- Smart Contract: Controls voting process and data storage on the blockchain.
- Salt Hashing: Securely stores user passwords against data leaks.
- Many modifiers: Secure access control for different users.
- 2-Factor Authentication (future): Facial recognition for stronger login security.

### Facial recognition and Verification

- An image of user will be captured while registering along with document. If the image is valid then it will be stored. Same image will be used to authenticate the user when he is trying to login.
- After registering, the image and document of the user is stored on IPFS and the hash generated is stored on Ethereum Network for gas optimization.
- We have used Face API library of ReactJS for DL models required for the facial recognition.
- We have used principle of Euclidean Distance for comparing the similarity of the two faces.
- We have set the threshold for the distance to 0.5 after verifying it on various faces and researching the standard value across the internet.


### Document verification and OTP verification

- User has to provide a valid photo id card when he is registering which will be used to verify the image captured ensuring the identity of the user.
- We have used the facial recognition method as explained in the previous slide.
- To ensure the authenticity of the email id, we have used OTP verification method for email id verification. 4 digit OTP will be sent on registered email which is generated randomly everytime.
- We have used SmtpJS library to implement this feature in ReactJS and created own serve using Elastic


### Gas optimization

- Minimize on chain storage:    Offload data to decentralized storage solutions like IPFS. Only store the unique IPFS hash in the smart contract, significantly reducing gas used for storage and retrievals.
- Prioritize Gas-Efficient Operations:  Write optimized code by prioritizing cheaper operations like reading/writing memory variables, constants, and local variables. Utilize internal function calls instead of external ones.
- Decentralize for Security and Efficiency:  Leverage the inherent security and transparency of multiple decentralized networks (4 blockchains in our case) for storing admin, voter, and candidate data. This not only ensures data integrity but also distributes gas costs across the network.


### Data Security

- Double layer protection: Passwords and confidential data are shielded with encryption, while Keccak256 hashing with salt adds extra layers of protection.
- Decentralized Fortress: Large data lives securely on IPFS, with only its unique hash stored in the smart contract, boosting gas efficiency and security.
- Smart Contract safety: secure coding practices, and access control measures safeguard the smart contract against potential attacks.
Futureproof Vigilance: Facial authentication plans leverage IPFS for data storage, upholding our unwavering commitment to data security.


## How to run project?

Steps to setup the network in metamask:
1) Install the Metamask Extension in your chrome browser.
2) After setting up account in Metamask, go to "Add Network" option from top left corner where current selected network is shown.
3) Choose "Add Network Manually".
4) Setup the other information using below settings:
   ![image](https://github.com/ShubhamG2311/Online-Voting-System/assets/76262127/e80b82bf-b5a0-4829-944e-b9341d4a69a2)



Steps to run the project:

1) Clone the repository to your local computer.
2) Install the required node packages using npm installer
  ```
npm install
 ```
3) Run the following command in the terminal to simulate the blockchain using hardhat
```
npx hardhat node
```
4) In another terminal, compile the smart contract using the below command.
```
npx hardhat compile
```
5) Run the contract on the blockchain using following command.
```
npx hardhat run --network localhost scripts/deploy.js
```
6) Start the react project
```
npm start
```


## References and Research papers


