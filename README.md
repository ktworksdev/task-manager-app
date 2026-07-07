# 📌 JWT Task Manager App

![Node.js](https://img.shields.io/badge/Node.js-18-green)
![Express](https://img.shields.io/badge/Express-4-lightgrey)
![SQLite](https://img.shields.io/badge/SQLite-3-blue)
![JWT](https://img.shields.io/badge/Auth-JWT-red)
![CRUD](https://img.shields.io/badge/Feature-CRUD-orange)

---

## 🎯 Overview（概要）

このプロジェクトは、**JWT認証付きタスク管理アプリ**です。

Node.js・Express・SQLiteを使用し、ユーザー登録・ログイン機能を実装しています。  
ログイン後はJWTを利用して認証を行い、自分専用のタスクを管理できます。

REST APIによるCRUD操作と、フロントエンド・バックエンドを分離した構成で実装しています。

---

## 🖥️ Demo

### Login

![Login](./public/images/login.png)

### Register

![Register](./public/images/register.png)

### Task List

![Task List](./public/images/tasks.png)

---

## 🚀 Features（機能）

- ユーザー登録
- ログイン
- ログアウト
- JWT認証
- タスク一覧取得
- タスク追加
- タスク編集
- タスク削除
- タスク完了・未完了切替
- ユーザーごとのタスク管理

---

## 🛠 Tech Stack（使用技術）

### Backend

- Node.js
- Express
- JWT（jsonwebtoken）
- bcrypt
- dotenv

### Database

- SQLite3

### Frontend

- HTML
- CSS
- JavaScript（Vanilla JS）
- Fetch API

---

## 📁 Project Structure

```text
task-manager-app/
│
├── public/
│   ├── images/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── style.css
│   └── js/
│       ├── api.js
│       ├── app.js
│       ├── login.js
│       ├── register.js
│       └── ui.js
│
├── routes/
│   ├── auth.js
│   └── tasks.js
│
├── middleware/
│   └── authMiddleware.js
│
├── .env
├── .gitignore
├── db.js
├── index.js
├── package.json
├── package-lock.json
├── tasks.db
└── README.md
```

---

## ⚙️ Getting Started（セットアップ方法）

### 1. リポジトリをクローン

```bash
git clone https://github.com/jkt-gh/task-manager-app.git
```

### 2. ディレクトリへ移動

```bash
cd task-manager-app
```

### 3. パッケージをインストール

```bash
npm install
```

### 4. .envを作成

```env
PORT=3000
DB_PATH=./tasks.db
JWT_SECRET=your_secret_key
```

### 5. サーバー起動

```bash
npm start
```

または

```bash
npx nodemon index.js
```

---

## 🌐 Access

ブラウザでアクセス

```
http://localhost:3000
```

初回は

```
http://localhost:3000/register.html
```

からユーザー登録してください。

---

## 🔗 Links

- GitHub Repository  
  https://github.com/jkt-gh/task-manager-app

- Local Demo  
  http://localhost:3000

---

## 📡 API Specification

### Authentication

| Method | Endpoint           | Description  |
| ------ | ------------------ | ------------ |
| POST   | /api/auth/register | ユーザー登録 |
| POST   | /api/auth/login    | ログイン     |

### Tasks

| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| GET    | /api/tasks     | タスク一覧取得 |
| POST   | /api/tasks     | タスク追加     |
| PUT    | /api/tasks/:id | タスク更新     |
| DELETE | /api/tasks/:id | タスク削除     |

---

## 🔐 Authentication

ログイン成功後にJWTを発行します。

取得したトークンは

```
localStorage
```

へ保存し、

```
Authorization: Bearer <token>
```

を付与してAPIへアクセスします。

JWTが無効・期限切れの場合はログイン画面へリダイレクトされます。

---

## 💡 Key Highlights（工夫した点）

- JWTによる認証機能
- bcryptによるパスワードのハッシュ化
- Express Routerによるルーティング分割
- Middlewareによる認証処理
- REST API設計
- Fetch APIによる非同期通信
- フロントエンド・バックエンド分離
- SQLiteによる軽量データベース設計

---

## 📚 Learning Purpose（学習目的）

- Node.jsによるWebアプリ開発
- Express Routerの利用
- JWT認証
- bcryptによるパスワード管理
- SQLite操作
- REST API設計
- CRUDアプリケーション開発
- フロントエンドとバックエンドの連携

---

## 📈 Future Improvements（今後の改善）

- タスク検索
- ソート機能
- ページネーション
- Reactへの移行
- PostgreSQLへの移行

---

## ⚠️ Notes（注意事項）

- node_modulesはGitHubへ含めていません
- .envはGitHubへ含めていません
- tasks.dbは初回起動時に自動生成されます
- Render・Vercelへのデプロイ対応予定

---

## 👤 Author

Node.js・Express・SQLite・JWTを使用して開発した、認証付きタスク管理アプリです。

Express Router・Middleware・JWT認証・CRUD操作を組み合わせ、実務を意識した構成で開発しました。
````
