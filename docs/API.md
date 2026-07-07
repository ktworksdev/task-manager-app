# Task Manager API Specification

## Overview

Task Manager API is a REST API
for managing personal tasks.

Authentication uses JWT.

---

# Base URL

Development:

```
http://localhost:3000
```

---

# Authentication API

## 1. User Registration

### POST

```
/api/auth/register
```

---

## Request

Content-Type:

```
application/json
```

Body:

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

---

## Success Response

Status:

```
201 Created
```

Response:

```json
{
  "message": "ユーザー登録成功",
  "user": {
    "id": 1,
    "email": "test@example.com"
  }
}
```

---

## Error Response

### Email already exists

Status:

```
409 Conflict
```

Response:

```json
{
  "message": "このメールアドレスは既に登録されています"
}
```

---

# 2. Login

## POST

```
/api/auth/login
```

---

## Request

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

---

## Success Response

Status:

```
200 OK
```

Response:

```json
{
  "message": "ログイン成功",
  "token": "JWT_TOKEN"
}
```

---

# Task API

All task APIs require JWT.

Header:

```
Authorization: Bearer TOKEN
```

---

# 3. Get Tasks

## GET

```
/api/tasks
```

---

## Success Response

Status:

```
200 OK
```

Response:

```json
{
  "message": "成功",
  "data": [
    {
      "id": 1,
      "title": "Study Node.js",
      "completed": 0,
      "user_id": 1,
      "created_at": "2026-07-07"
    }
  ]
}
```

---

# 4. Create Task

## POST

```
/api/tasks
```

---

## Request

```json
{
  "title": "Create Portfolio"
}
```

---

## Success Response

Status:

```
200 OK
```

Response:

```json
{
  "message": "作成成功",
  "id": 1
}
```

---

## Error Response

### Empty title

Status:

```
400 Bad Request
```

Response:

```json
{
  "message": "タスク名を入力してください"
}
```

---

### Title length exceeded

Status:

```
400 Bad Request
```

Response:

```json
{
  "message": "30文字以内で入力してください"
}
```

---

# 5. Update Task

## PUT

```
/api/tasks/:id
```

Example:

```
/api/tasks/1
```

---

## Request

```json
{
  "title": "Learn Express",
  "completed": true
}
```

---

## Success Response

Status:

```
200 OK
```

Response:

```json
{
  "message": "更新完了",
  "changes": 1
}
```

---

## Error Response

### Task not found

Status:

```
404 Not Found
```

Response:

```json
{
  "message": "タスクが見つかりません"
}
```

---

# 6. Delete Task

## DELETE

```
/api/tasks/:id
```

Example:

```
/api/tasks/1
```

---

## Success Response

Status:

```
200 OK
```

Response:

```json
{
  "message": "削除成功",
  "deletedId": 1
}
```

---

## Error Response

### Task not found

Status:

```
404 Not Found
```

Response:

```json
{
  "message": "タスクが見つかりません"
}
```

---

# Authentication Errors

## 401 Unauthorized

Token missing

Response:

```json
{
  "message": "トークンなし"
}
```

---

## 401 Unauthorized

Invalid token format

Response:

```json
{
  "message": "形式エラー"
}
```

---

## 403 Forbidden

Invalid or expired token

Response:

```json
{
  "message": "トークン無効"
}
```

---

# Database Structure

## users table

| column     | type     |
| ---------- | -------- |
| id         | INTEGER  |
| email      | TEXT     |
| password   | TEXT     |
| created_at | DATETIME |

---

## tasks table

| column     | type     |
| ---------- | -------- |
| id         | INTEGER  |
| title      | TEXT     |
| completed  | INTEGER  |
| user_id    | INTEGER  |
| created_at | DATETIME |
| updated_at | DATETIME |

---

# Technology

## Backend

- Node.js
- Express
- SQLite

## Authentication

- JWT
- bcrypt

## Frontend

- HTML
- CSS
- JavaScript
