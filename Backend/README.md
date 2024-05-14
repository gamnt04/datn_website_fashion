
# Node.js Authentication & CRUD Project

This project is a Node.js server application that provides CRUD (Create, Read, Update, Delete) functionality along with user authentication features such as SignUp, SignIn, and Authorization. It serves as a foundation for building web applications with user management and data manipulation capabilities.

## Features

- **CRUD Operations**: Perform Create, Read, Update, and Delete operations on data resources.
- **SignUp**: Allow users to register for an account.
- **SignIn**: Enable users to authenticate with their credentials.
- **Authorization**: Restrict access to certain routes or resources based on user roles or permissions.

## Technologies Used

- **Node.js**: A JavaScript runtime environment for building server-side applications.
- **Express.js**: A web application framework for Node.js used for routing and middleware.
- **MongoDB**: A NoSQL database for storing application data.
- **JSON Web Tokens (JWT)**: Used for secure authentication and authorization.
- **bcrypt.js**: Library for hashing passwords securely.
- **cors**: A middleware for Express.js that enables Cross-Origin Resource Sharing (CORS) to allow client-side code running in a web browser to make requests to your server from a different origin.
- **joi**: A JavaScript schema description language and validator, commonly utilized for validating request data in Express.js applications.

### Development:
- **nodemon**: A utility that monitors changes in your source code and automatically restarts the server when changes are detected, facilitating the development process.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/HoangPhiNhat/nodejs-authentication-crud
   ```

2. Navigate to the project directory:

   ```bash
   cd nodejs-authentication-crud
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Define the following variables:

     ```plaintext
     PORT=3000
     DB_URI=your_mongodb_connection_string
     SECRET_CODE=your_jwt_secret_key
     ```

5. Start the server:

   ```bash
   npm start
   ```

## Usage

- Once the server is running, you can access the API endpoints using tools like Postman or integrate them into your frontend application.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests for any improvements or new features.

