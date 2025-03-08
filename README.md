# Application
## Authentication API Documentation
## Overview
This API provides authentication functionality, including user registration, login, logout, and access to protected routes. The authentication is handled using JWT (JSON Web Token) stored in an HTTP-only cookie.
________________________________________
## Base URL
http://localhost:3000/auth
________________________________________
## Endpoints
### 1. User Registration (Sign Up)
### Endpoint:
POST /auth/signup <br>
Description: Registers a new user. <br>
 Request Body: <br>
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123"
}
```
 Response:
```json
{
  "message": "User created successfully",
  "user": {
    "id": "60af9243e2b3b03f6c5e8e4a",
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}
```
```json
{
 "statusCode": 400,
  "message": "Email already exists",
  "error": "Bad Request"
}
```
________________________________________
### 2. User Login
### Endpoint:
POST /auth/login  <br>
Description: Authenticates the user and sets a JWT in an HTTP-only cookie.  <br>
Request Body:
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123"
}
```
Response:
```json
{
  "message": "Login successful"
}
```
### Notes:
1.	The JWT token is stored in an HTTP-only cookie for security.
2.	The cookie will expire in 24 hours.
________________________________________
### 3. User Logout
### Endpoint:
GET /auth/logout  <br>
Description: Clears the authentication cookie, logging out the user. <br>
Response:
```json
{
  "message": "Logout successful"
}
```
Notes:
•	The JWT token is removed by setting an expired cookie.
________________________________________
### 4. Protected Route (Requires Authentication)
### Endpoint:
GET /auth/protected  <br>
Description: Returns authenticated user details if the request contains a valid JWT token. <br>
### Headers (Required):
Authorization: Bearer <your-jwt-token>
Response (If Authenticated):
```json
{
  "message": "Authenticated",
  "user": {
    "userId": "60af9243e2b3b03f6c5e8e4a",
    "email": "john.doe@example.com"
  }
}
```
Response (If Unauthorized):
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```
________________________________________
## Security Features
1.	JWT-based authentication
2.	HTTP-only cookies to store tokens securely
3.	CSRF protection using sameSite: 'strict'
4.	Token expiration to enhance security
________________________________________
## Usage Instructions
1.	Register a new user using the /signup endpoint.
2.	Login to receive a JWT stored in a cookie.
3.	Access protected routes by sending requests with the cookie.
4.	Logout to remove the authentication cookie.
________________________________________
## Tools & Technologies Used
1.	NestJS (Backend framework)
2.	JWT (JSON Web Token) for authentication
3.	MongoDB for storing user data
4.	Express.js for handling HTTP requests
