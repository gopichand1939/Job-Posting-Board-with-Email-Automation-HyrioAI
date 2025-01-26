# Job-Posting-Board-with-Email-Automation-HyrioAI

Job Posting Board with Email Automation (HyrioAI)

This project is a full-stack application that allows companies to:

Register and verify their accounts.
Post job openings.
Notify candidates via email about job opportunities.
It leverages the MERN stack for development:

Frontend: React.js.
Backend: Node.js, Express.js.
Database: MongoDB (Atlas).
Email Automation: Nodemailer.
The backend handles the following:

Company Registration with Email Verification.
Company Login using JWT for cookie-based authentication.
Job Posting by authenticated companies.
Candidate Notification via email for specific job postings.
Logout functionality to clear authentication cookies.
How to Run This Project
1. Clone the Repository
To get started, clone the repository:


git clone https://github.com/gopichand1939/Job-Posting-Board-with-Email-Automation-HyrioAI.git
cd Job-Posting-Board-with-Email-Automation-HyrioAI/backend
2. Install Dependencies
Install all required dependencies using:

npm install
3. Set Up Environment Variables
Create a .env file in the backend directory with the following keys:

env

MONGO_URI=<Your_MongoDB_URI>
JWT_SECRET=<Your_Secret_Key>
EMAIL_USER=<Your_Email_Address>
EMAIL_PASS=<Your_Email_Password>
Replace <Your_MongoDB_URI>, <Your_Secret_Key>, <Your_Email_Address>, and <Your_Email_Password> with your own credentials.

4. Run the Server
Start the server in development mode:

bash
npm run dev
The server will start at http://localhost:5000.

Endpoints Achieved
1. User Registration
URL: POST /api/auth/register
Registers a new company.

Request Body (Example):

json

{
  "name": "Gopichand Pvt Ltd",
  "email": "example@gmail.com",
  "password": "password123",
  "mobile": "1234567890"
}
2. Email Verification
URL: GET /api/auth/verify/:token
Verifies a company's email using a token sent to their email.

3. User Login
URL: POST /api/auth/login
Authenticates a company and provides a JWT token.

Request Body (Example):

json

{
  "email": "example@gmail.com",
  "password": "password123"
}
4. Logout
URL: POST /api/auth/logout
Logs out the authenticated company and clears the cookie.

5. Job Posting
URL: POST /api/jobs
Creates a new job post (authenticated).

Request Body (Example):

json

{
  "jobTitle": "Software Engineer",
  "jobDescription": "Responsible for building and maintaining applications.",
  "experienceLevel": "BEGINNER",
  "candidates": ["candidate1@example.com", "candidate2@example.com"],
  "endDate": "2025-02-01"
}
6. Get All Jobs
URL: GET /api/jobs
Retrieves all job posts for the authenticated company.

7. Notify Candidates
URL: POST /api/jobs/:jobId/notify
Sends emails to candidates for a specific job post.

Commands Overview
Clone the Repository:

bash

git clone https://github.com/gopichand1939/Job-Posting-Board-with-Email-Automation-HyrioAI.git
cd Job-Posting-Board-with-Email-Automation-HyrioAI/backend
Install Dependencies:

bash

npm install
Run the Server:

bash

npm run dev
Testing Example Endpoints
Using Postman or cURL:
Register a Company:

POST http://localhost:5000/api/auth/register
Example Request Body:
json

{
  "name": "Gopichand Pvt Ltd",
  "email": "example@gmail.com",
  "password": "password123",
  "mobile": "1234567890"
}
Verify Email:

GET http://localhost:5000/api/auth/verify/:token
Login:

POST http://localhost:5000/api/auth/login
Example Request Body:
json

{
  "email": "example@gmail.com",
  "password": "password123"
}
Post a Job:

POST http://localhost:5000/api/jobs
Example Request Body:
json

{
  "jobTitle": "Software Engineer",
  "jobDescription": "Responsible for building and maintaining applications.",
  "experienceLevel": "BEGINNER",
  "candidates": ["candidate1@example.com", "candidate2@example.com"],
  "endDate": "2025-02-01"
}
Notify Candidates:

POST http://localhost:5000/api/jobs/:jobId/notify
Summary
This project implements a fully functional backend for a job posting board with email automation. It is ready to integrate with a frontend application.


![alt text](image.png)
![alt text](image-1.png)  user register end point 
![alt text](image-2.png)  Email Recived 
![alt text](image-3.png)  {"message":"Email verified successfully"}

POST /api/auth/register 201 2385.633 ms - 71
GET /api/auth/verify/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Nzk2OGNiNjk2OTlmYWIxN2UyZmJjOWEiLCJpYXQiOjE3Mzc5MTk2NzAsImV4cCI6MTczNzkyMzI3MH0.Lg3PDjwCS9c8Ai5h5mC00T3uykC9tWXVU2WuGLQJiF0 200 86.554 ms - 41
GET /favicon.ico 404 1.273 ms - 150


![alt text](image-4.png)  Login Successful 
POST /api/auth/login 200 170.677 ms - 30


![alt text](image-5.png)  Logout Successful 

![alt text](image-6.png)  Job Posted Suceesfullly 

{
    "message": "Job posted successfully",
    "job": {
        "companyId": "67969137c48789ba045143f5",
        "jobTitle": "Software Engineer",
        "jobDescription": "Responsible for building and maintaining applications.",
        "experienceLevel": "BEGINNER",
        "candidates": [
            "padmachegg1939@gmail.com",
            "mipad7515@gmail.com"
        ],
        "endDate": "2025-02-01T00:00:00.000Z",
        "_id": "6796936ec48789ba045143fa",
        "__v": 0
    }
}


![alt text](image-7.png)  Verify Job Posting
Method: GET
URL: http://localhost:5000/api/jobs
Headers:
Authorization: Bearer <your-token>
Content-Type: application/json


Notify Candidates via Email
Method: POST
URL: http://localhost:5000/api/jobs/6796936ec48789ba045143fa/notify
Headers:
Authorization: Bearer <your-token>
Content-Type: application/json

![alt text](image-8.png)

mail received 
 ![alt text](image-9.png) candite 1 notification 
![alt text](image-10.png) candite 2 notification


Test Logout Endpoint:

URL: http://localhost:5000/api/auth/logout
Method: POST
Headers:
Authorization: Bearer <your-token>
Expected Response:
json

{
  "message": "Logout successful"
}

![alt text](image-11.png)  Logout End point 

Final Confirmation:

All endpoints have now been tested:
/api/auth/register – Registration ✅
/api/auth/verify/:token – Email Verification ✅
/api/auth/login – Login ✅
/api/jobs (POST) – Job Posting ✅
/api/jobs/:jobId/notify – Email Notification ✅
/api/jobs (GET) – Fetch Jobs ✅
/api/auth/logout – Logout ✅    


![image](https://github.com/user-attachments/assets/da78d4e8-8c49-4bc6-b819-d7f9bcb7c4d0)  ..
