# Seentix API Reference

Base URL (local development): `http://localhost:3333`

All API responses use JSON. Most endpoints wrap payloads in a top-level `data` property via the application serializer. Validation errors return HTTP `422` with an `errors` array.

## Authentication

Protected routes require a JWT issued by signup, login, or two-factor verification.

| Header | Value |
|--------|-------|
| `Authorization` | `Bearer <token>` |
| `Accept` | `application/json` |
| `Content-Type` | `application/json` (for requests with a body) |

Access tokens expire after the duration set in `JWT_TOKEN_LIFETIME` (default **7 days**). Refresh token lifetime is controlled by `JWT_REFRESH_TOKEN_LIFETIME` (default **30 days**) when refresh tokens are enabled. Logout is client-side only (the server does not revoke tokens).

### Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `JWT_SECRET` | _(required)_ | Secret used to sign JWTs |
| `JWT_TOKEN_LIFETIME` | `7d` | Access token lifetime ([ms](https://github.com/vercel/ms) format, e.g. `15m`, `1h`, `7d`) |
| `JWT_REFRESH_TOKEN_LIFETIME` | `30d` | Refresh token lifetime when refresh tokens are enabled |

---

## Routes

### Health check

#### `GET /`

Returns a simple message confirming the API is running. No authentication required.

**Response `200`**

```json
{
  "message": "Seentix API"
}
```

---

### Auth

#### `POST /api/v1/auth/signup`

Create a new user account with **email** or **phone number**. On success, returns the user and a JWT. A verification email is queued when an email address is provided.

**Request body**

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `email` | string | One of `email` or `phoneNumber` | Valid email, max 254 chars, unique |
| `phoneNumber` | string | One of `email` or `phoneNumber` | Min 1 character, unique |
| `password` | string | Yes | Minimum 8 characters |
| `passwordConfirmation` | string | Yes | Must match `password` |
| `fullName` | string \| null | Yes | — |
| `dateOfBirth` | date (ISO 8601) | No | — |

**Example request (email)**

```json
{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "password": "secret123",
  "passwordConfirmation": "secret123",
  "dateOfBirth": "1990-01-15"
}
```

**Example request (phone number)**

```json
{
  "fullName": "Jane Doe",
  "phoneNumber": "+15551234567",
  "password": "secret123",
  "passwordConfirmation": "secret123"
}
```

**Response `200`**

```json
{
  "data": {
    "user": {
      "id": 1,
      "fullName": "Jane Doe",
      "email": "jane@example.com",
      "phoneNumber": "+15551234567",
      "dateOfBirth": "1990-01-15",
      "use2Fa": false,
      "emailVerifiedAt": null,
      "createdAt": "2026-06-28T12:00:00.000+00:00",
      "updatedAt": "2026-06-28T12:00:00.000+00:00",
      "initials": "JD",
      "isEmailVerified": false
    },
    "token": "<jwt>"
  }
}
```

**Errors**

| Status | When |
|--------|------|
| `422` | Validation failed (e.g. email or phone already taken, password mismatch) |

---

#### `POST /api/v1/auth/login`

Authenticate with email **or** phone number and password. If the user has two-factor authentication enabled, a short-lived session token is returned instead of a JWT and a 6-digit code is sent by email.

**Request body**

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `email` | string | One of `email` or `phoneNumber` | Valid email |
| `phoneNumber` | string | One of `email` or `phoneNumber` | Min 1 character |
| `password` | string | Yes | — |

**Example request (email)**

```json
{
  "email": "jane@example.com",
  "password": "secret123"
}
```

**Example request (phone number)**

```json
{
  "phoneNumber": "+15551234567",
  "password": "secret123"
}
```

**Response `200` — success (no 2FA)**

```json
{
  "data": {
    "user": { "...": "user object (see signup response)" },
    "token": "<jwt>"
  }
}
```

**Response `200` — 2FA required**

```json
{
  "data": {
    "requiresTwoFactor": true,
    "twoFactorToken": "<session-token>"
  }
}
```

**Errors**

| Status | When |
|--------|------|
| `401` | Invalid email, phone number, or password |
| `422` | Validation failed |

---

#### `POST /api/v1/auth/verify-2fa`

Complete login when two-factor authentication is required. Exchanges the session token and 6-digit code for a JWT.

**Request body**

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `twoFactorToken` | string | Yes | From login response |
| `code` | string | Yes | Exactly 6 characters |

**Example request**

```json
{
  "twoFactorToken": "<session-token>",
  "code": "123456"
}
```

**Response `200`**

```json
{
  "data": {
    "user": { "...": "user object" },
    "token": "<jwt>"
  }
}
```

**Errors**

| Status | When |
|--------|------|
| `500` | Invalid or expired session, or wrong code |
| `422` | Validation failed |

> Two-factor codes expire after **10 minutes**.

---

#### `GET /api/v1/auth/verify-email`

Verify a user's email address using the token from the verification email link.

**Query parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `token` | string | Yes | Token from verification email |

**Example**

```
GET /api/v1/auth/verify-email?token=<verification-token>
```

**Response `200`**

```json
{
  "data": {
    "message": "Email verified successfully"
  }
}
```

**Errors**

| Status | When |
|--------|------|
| `422` | Missing, invalid, or already-used token |

---

### Account (authenticated)

All routes in this group require `Authorization: Bearer <token>`.

#### `GET /api/v1/account/profile`

Return the authenticated user's profile.

**Response `200`**

```json
{
  "data": {
    "id": 1,
    "fullName": "Jane Doe",
    "email": "jane@example.com",
    "phoneNumber": "+15551234567",
    "dateOfBirth": "1990-01-15",
    "use2Fa": false,
    "emailVerifiedAt": "2026-06-28T12:05:00.000+00:00",
    "createdAt": "2026-06-28T12:00:00.000+00:00",
    "updatedAt": "2026-06-28T12:05:00.000+00:00",
    "initials": "JD",
    "isEmailVerified": true
  }
}
```

**Errors**

| Status | When |
|--------|------|
| `401` | Missing or invalid JWT |

---

#### `POST /api/v1/account/logout`

Acknowledge logout. The client should discard the JWT; the server does not invalidate it.

**Response `200`**

```json
{
  "data": {
    "message": "Logged out successfully"
  }
}
```

**Errors**

| Status | When |
|--------|------|
| `401` | Missing or invalid JWT |

---

### File storage

#### `GET /uploads/*`

Serve public files from local disk storage (`storage/` directory). Registered automatically by the Drive package. No authentication.

**Example**

```
GET /uploads/avatars/user-1.png
```

Returns the file with the appropriate `Content-Type`, or `404` if not found.

---

## User object

Fields returned by `UserTransformer`:

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | User ID |
| `fullName` | string \| null | Display name |
| `email` | string | Email address |
| `phoneNumber` | string \| null | Phone number |
| `dateOfBirth` | string \| null | ISO date |
| `use2Fa` | boolean | Whether 2FA is enabled |
| `emailVerifiedAt` | string \| null | ISO timestamp when email was verified |
| `createdAt` | string | ISO timestamp |
| `updatedAt` | string \| null | ISO timestamp |
| `initials` | string | Derived from full name or email |
| `isEmailVerified` | boolean | Whether `emailVerifiedAt` is set |

---

## Validation errors

When request validation fails, the API responds with HTTP `422`:

```json
{
  "errors": [
    {
      "message": "The email field must be a valid email address",
      "rule": "email",
      "field": "email"
    }
  ]
}
```

---

## Route summary

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/` | No | Health check |
| `POST` | `/api/v1/auth/signup` | No | Register a new account |
| `POST` | `/api/v1/auth/login` | No | Log in |
| `POST` | `/api/v1/auth/verify-2fa` | No | Complete 2FA login |
| `GET` | `/api/v1/auth/verify-email` | No | Verify email address |
| `GET` | `/api/v1/account/profile` | JWT | Get current user profile |
| `POST` | `/api/v1/account/logout` | JWT | Log out |
| `GET` | `/uploads/*` | No | Serve uploaded files |

---

## Postman collection

Collection variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `baseUrl` | `http://localhost:3333` | API base URL |
| `token` | _(empty)_ | JWT; set automatically after signup/login |
| `twoFactorToken` | _(empty)_ | 2FA session token from login |
| `verificationToken` | _(empty)_ | Email verification token (set manually) |
