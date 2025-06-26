# User Registration API Documentation

## Endpoint

`POST /users/register`

## Description

Registers a new user in the system. This endpoint validates the input, hashes the password, creates the user, and returns an authentication token along with user details.

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

## Responses

### Success

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "socketID": null
    },
    "token": "jwt_token"
  }
  ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "First name must be at least 3 characters long",
        "param": "fullname.firstname",
        "location": "body"
      }
      // ...other errors
    ]
  }
  ```

### Other Errors

- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "error": "Error message"
  }
  ```

## Example Request

>
> ```bash
> curl -X POST http://localhost:4000/users/register \
>   -H "Content-Type: application/json" \
>   -d '{
>     "fullname": { "firstname": "John", "lastname": "Doe" },
>     "email": "john.doe@example.com",
>     "password": "yourpassword"
>   }'
> ```


### Example Response

```json
{
"message": "User registered successfully",
"user": {
    "id": "user_id",
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketID": null
},
"token": "jwt_token"
}
```

---

## Login User

### Endpoint

`POST /users/login`

### Description
Authenticates a user with email and password. Returns a JWT token and user details on success.

### Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Field Requirements
- `email` (string, required): Must be a valid email address.
- `password` (string, required): At least 6 characters.

### Responses

#### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Login successful",
    "user": {
      "id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "socketID": null
    },
    "token": "jwt_token"
  }
  ```

#### Invalid Credentials
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Invalid credentials"
  }
  ```

#### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
      // ...other errors
    ]
  }
  ```

#### Server Error
- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "error": "Error message"
  }
  ```

### Example Request
```bash
curl -X POST http://localhost:4000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```

### Example Response
```json
{
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketID": null
  },
  "token": "jwt_token"
}
```
