Accessing GitHub Code and Running the Project


Demo Video : https://drive.google.com/file/d/1vg0RKLCqM0a4V2mxW0YGq2Fee836atQN/view?usp=sharing 


Follow these step-by-step instructions to access the GitHub code, run the project using npm run start, and set up the MongoDB connection:


Prerequisites:
Node.js and npm should be installed on your system. If not, you can download and install them from the official Node.js website (https://nodejs.org).




Clone the GitHub repository: git clone https://github.com/pranjalipriya/pdfshare.git


Backend Setup:
Navigate to the backend directory: pdf-collaboration-system-backend
Install backend dependencies: npm i
MongoDB Connection:
Create a file named .env in the backend directory.
Open the .env file in a text editor and paste the following line:
CONNECTION_STRING=<your-mongo-connection-string>
Start the backend server: npm run start
Frontend Setup:
Navigate to the frontend directory: pdf-collaboration-system-frontend
Install frontend dependencies: npm i
Start the frontend development server: npm run start


Both the backend and frontend servers are now running.
The backend server is accessible at http://localhost:4000.
The frontend development server is accessible at http://localhost:3000.


Accessing the Project:
Login page: http://localhost:3000/login
Signup page: http://localhost:3000/register
Upload page: http://localhost:3000/upload