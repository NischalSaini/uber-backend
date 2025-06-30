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

---

## Get User Profile

### Endpoint

`GET /users/profile`

### Description
Returns the authenticated user's profile information. Requires authentication (JWT token in cookie or Authorization header).

### Headers
- `Authorization: Bearer <token>` (if not using cookie)

### Responses

#### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "user": {
      "id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "socketID": null
    }
  }
  ```

#### Not Found
- **Status Code:** `404 Not Found`
- **Body:**
  ```json
  {
    "message": "User not found"
  }
  ```

#### Unauthorized
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Authentication required"
  }
  ```

---

## Logout User

### Endpoint

`GET /users/logout`

### Description
Logs out the authenticated user by clearing the authentication token (cookie) and blacklisting the token.

### Headers
- `Authorization: Bearer <token>` (if not using cookie)

### Responses

#### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Logout successful"
  }
  ```

### Example Response
```json
{
  "message": "Logout successful"
}
```

---

# Captain Registration API Documentation

## Register Captain

### Endpoint

`POST /captains/register`

### Description
Registers a new captain (driver) in the system. Validates input, hashes the password, creates the captain, and returns a JWT token along with captain and vehicle details.

### Request Body
Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Field Requirements
- `fullname.firstname` (string, required): At least 3 characters.
- `fullname.lastname` (string, required): At least 3 characters.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): At least 6 characters.
- `vehicle.color` (string, required): At least 3 characters.
- `vehicle.plate` (string, required): At least 3 characters.
- `vehicle.capacity` (integer, required): At least 1.
- `vehicle.vehicleType` (string, required): One of `car`, `bike`, `truck`.

### Responses

#### Success
- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "message": "Captain registered successfully",
    "captain": {
      "id": "captain_id",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Smith"
      },
      "email": "jane.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
    },
    "token": "jwt_token"
  }
  ```

#### Validation Error
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

#### Duplicate Email
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "message": "Captain with this email already exists"
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
curl -X POST http://localhost:4000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "jane.smith@example.com",
    "password": "yourpassword",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```

### Example Response
```json
{
  "message": "Captain registered successfully",
  "captain": {
    "id": "captain_id",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  },
  "token": "jwt_token"
}
```
