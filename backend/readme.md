# API Documentation

## `/users/register` Endpoint Documentation

### Endpoint Description

The `/users/register` endpoint is used to register a new user in the system. It accepts user details, validates the input, hashes the password, and creates a new user record in the database. Upon successful registration, it returns an authentication token and the user details.

---

### HTTP Method

**POST**

---

### URL

```
/users/register
```

---

### Request Body

The endpoint expects the following JSON structure in the request body:

```json
{
  "fullName": {
    "firstName": "string (min length: 3)",
    "lastName": "string (optional, min length: 3)"
  },
  "email": "string (valid email format, min length: 11)",
  "password": "string (min length: 6)"
}
```

### Validation Rules:

- **`fullName.firstName`**: Must be at least 3 characters long.
- **`fullName.lastName`**: Optional, but if provided, must be at least 3 characters long.
- **`email`**: Must be a valid email format and at least 11 characters long.
- **`password`**: Must be at least 6 characters long.

---

### Response

#### Success Response

**Status Code**: `201 Created`

**Response Body**:

```json
{
  "token": "string (JWT token)",
  "user": {
    "_id": "string (user ID)",
    "fullName": {
      "firstName": "string",
      "lastName": "string"
    },
    "email": "string"
  }
}
```

#### Error Responses

##### Validation Error

**Status Code**: `400 Bad Request`

**Response Body**:

```json
{
  "errors": [
    {
      "msg": "string (error message)",
      "param": "string (field name)",
      "location": "string (location of the error, e.g., 'body')"
    }
  ]
}
```

##### Missing Required Fields

**Status Code**: `400 Bad Request`

**Response Body**:

```json
{
  "message": "All fields are required"
}
```

---

### Example Usage

#### Request

```bash
curl -X POST http://localhost:3000/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword123"
}'
```

#### Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

---

### Notes

- Ensure the `JWT_SECRET` environment variable is set for token generation.
- Passwords are hashed before being stored in the database for security.
- The endpoint uses `express-validator` for input validation.

---

## `/users/login` Endpoint Documentation

### Endpoint Description

The `/users/login` endpoint is used to authenticate an existing user. It validates the provided email and password, checks the credentials against the database, and returns an authentication token if the login is successful.

---

### HTTP Method

**POST**

---

### URL

```
/users/login
```

---

### Request Body

The endpoint expects the following JSON structure in the request body:

```json
{
  "email": "string (valid email format)",
  "password": "string (min length: 6)"
}
```

### Validation Rules:

- **`email`**: Must be a valid email format.
- **`password`**: Must be at least 6 characters long.

---

### Response

#### Success Response

**Status Code**: `200 OK`

**Response Body**:

```json
{
  "token": "string (JWT token)",
  "user": {
    "_id": "string (user ID)",
    "fullName": {
      "firstName": "string",
      "lastName": "string"
    },
    "email": "string"
  }
}
```

#### Error Responses

##### Validation Error

**Status Code**: `400 Bad Request`

**Response Body**:

```json
{
  "errors": [
    {
      "msg": "string (error message)",
      "param": "string (field name)",
      "location": "string (location of the error, e.g., 'body')"
    }
  ]
}
```

##### Invalid Credentials

**Status Code**: `401 Unauthorized`

**Response Body**:

```json
{
  "message": "Invalid email or password"
}
```

---

### Example Usage

#### Request

```bash
curl -X POST http://localhost:3000/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}'
```

#### Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

---

### Notes

- Ensure the `JWT_SECRET` environment variable is set for token generation.
- Passwords are securely compared using bcrypt.
- The endpoint uses `express-validator` for input validation.

---

## `/users/profile` Endpoint Documentation

### Endpoint Description

The `/users/profile` endpoint is used to retrieve the authenticated user's profile information.

---

### HTTP Method

**GET**

---

### URL

```
/users/profile
```

---

### Authentication

This endpoint requires the user to be authenticated. A valid JWT token must be provided in the `Authorization` header or as a cookie.

---

### Response

#### Success Response

**Status Code**: `200 OK`

**Response Body**:

```json
{
  "_id": "string (user ID)",
  "fullName": {
    "firstName": "string",
    "lastName": "string"
  },
  "email": "string"
}
```

#### Error Responses

##### Unauthorized Access

**Status Code**: `401 Unauthorized`

**Response Body**:

```json
{
  "message": "Unauthorized"
}
```

---

### Example Usage

#### Request

```bash
curl -X GET http://localhost:3000/users/profile \
-H "Authorization: Bearer <JWT_TOKEN>"
```

#### Response

```json
{
  "_id": "60d0fe4f5311236168a109ca",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com"
}
```

---

## `/users/logout` Endpoint Documentation

### Endpoint Description

The `/users/logout` endpoint is used to log out the authenticated user by clearing the authentication token and blacklisting it.

---

### HTTP Method

**GET**

---

### URL

```
/users/logout
```

---

### Authentication

This endpoint requires the user to be authenticated. A valid JWT token must be provided in the `Authorization` header or as a cookie.

---

### Response

#### Success Response

**Status Code**: `200 OK`

**Response Body**:

```json
{
  "message": "Logged out"
}
```

#### Error Responses

##### Missing Token

**Status Code**: `400 Bad Request`

**Response Body**:

```json
{
  "message": "No token found"
}
```

---

### Example Usage

#### Request

```bash
curl -X GET http://localhost:3000/users/logout \
-H "Authorization: Bearer <JWT_TOKEN>"
```

#### Response

```json
{
  "message": "Logged out"
}
```

---

### Notes

- The token is blacklisted to prevent reuse.
- Blacklisted tokens expire after 24 hours.
