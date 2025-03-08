﻿# Application
# Authentication API Documentation
Overview
This API provides authentication functionality, including user registration, login, logout, and access to protected routes. The authentication is handled using JWT (JSON Web Token) stored in an HTTP-only cookie.
________________________________________
Base URL
http://localhost:3000/auth
________________________________________
Endpoints
1. User Registration (Sign Up)
Endpoint:
POST /auth/signup
Description: Registers a new user.
Request Body:
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123"
}
Response:
{
  "message": "User created successfully",
  "user": {
    "id": "60af9243e2b3b03f6c5e8e4a",
    "name": "John Doe",
    "email": "john.doe@example.com"
  }}
{ "statusCode": 400,
 "message": "Email already exists", "error": "Bad Request" }
________________________________________
2. User Login
Endpoint:
POST /auth/login
Description: Authenticates the user and sets a JWT in an HTTP-only cookie.
Request Body:
{
  "email": "john.doe@example.com",
  "password": "SecurePass123"
}
Response:
{
  "message": "Login successful"
}
Notes:
•	The JWT token is stored in an HTTP-only cookie for security.
•	The cookie will expire in 24 hours.
________________________________________
3. User Logout
Endpoint:
GET /auth/logout
Description: Clears the authentication cookie, logging out the user.
Response:
{
  "message": "Logout successful"
}
Notes:
•	The JWT token is removed by setting an expired cookie.
________________________________________
4. Protected Route (Requires Authentication)
Endpoint:
GET /auth/protected
Description: Returns authenticated user details if the request contains a valid JWT token.
Headers (Required):
Authorization: Bearer <your-jwt-token>
Response (If Authenticated):
{
  "message": "Authenticated",
  "user": {
    "userId": "60af9243e2b3b03f6c5e8e4a",
    "email": "john.doe@example.com"
  }
}
Response (If Unauthorized):
{
  "statusCode": 401,
  "message": "Unauthorized"
}
________________________________________
Security Features
•	JWT-based authentication
•	HTTP-only cookies to store tokens securely
•	CSRF protection using sameSite: 'strict'
•	Token expiration to enhance security
________________________________________
Usage Instructions
1.	Register a new user using the /signup endpoint.
2.	Login to receive a JWT stored in a cookie.
3.	Access protected routes by sending requests with the cookie.
4.	Logout to remove the authentication cookie.
________________________________________
Tools & Technologies Used
•	NestJS (Backend framework)
•	JWT (JSON Web Token) for authentication
•	MongoDB for storing user data
•	Express.js for handling HTTP requests
