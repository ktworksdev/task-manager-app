# 📌 Task Manager App（Node.js + Express + SQLite）

![Node.js](https://img.shields.io/badge/Node.js-18-green)
![Express](https://img.shields.io/badge/Express-4-lightgrey)
![SQLite](https://img.shields.io/badge/SQLite-3-blue)
![CRUD](https://img.shields.io/badge/Feature-CRUD-orange)

---

## 🎯 Overview（概要）

このプロジェクトは、**フロントエンドとバックエンドの連携構造（CRUD API設計）を理解するための学習用タスク管理アプリ**です。

Node.js + Express + SQLite を用いて、基本的なWebアプリケーションの構成を実装しています。

---

## 🖥️ Demo

![App Screenshot](./images/screenshot.png)

---

## 🚀 Features（機能）

- タスク一覧取得（GET）
- タスク追加（POST）
- タスク編集（PUT）
- タスク削除（DELETE）
- シンプルなUIで直感的な操作が可能

---

## 🛠 Tech Stack（使用技術）

### Backend

- Node.js
- Express

### Database

- SQLite3

### Frontend

- HTML / CSS
- JavaScript（Vanilla JS）
- Fetch API

---

## 📁 Project Structure

```text
task-manager-app/
├── public/
│   ├── index.html
│   ├── app.js
│   └── style.css
├── db.js
├── index.js
├── package.json
├── package-lock.json
└── tasks.db
```

---

## ⚙️ Getting Started（セットアップ方法）

```bash
# 1. リポジトリをクローン
git clone https://github.com/jkt-gh/task-manager-app.git

# 2. ディレクトリへ移動
cd task-manager-app

# 3. 依存パッケージをインストール
npm install

# 4. サーバー起動
node index.js
```

開発用：

```bash
npx nodemon index.js
```

---

## 🌐 Access

ブラウザで以下にアクセス：

```
http://localhost:3000
```

---

## 🔗 Links

- GitHub Repository: https://github.com/jkt-gh/task-manager-app
- Local Demo: http://localhost:3000（ローカル環境）

---

## 📡 API Specification

| Method | Endpoint   | Description    | Request Body         |
| ------ | ---------- | -------------- | -------------------- |
| GET    | /tasks     | タスク一覧取得 | -                    |
| POST   | /tasks     | タスク追加     | { title }            |
| PUT    | /tasks/:id | タスク更新     | { title, completed } |
| DELETE | /tasks/:id | タスク削除     | -                    |

---

## 💡 Key Highlights（工夫した点）

- Fetch APIを用いた非同期通信
- フロントエンドとバックエンドの分離構成
- REST API設計の実装経験
- SQLiteによる軽量データベース設計
- DOM操作によるシンプルなUI更新

---

## 📚 Learning Purpose（学習目的）

- Node.jsの基本構造理解
- ExpressによるAPI設計の習得
- SQLiteの基礎操作
- フロントエンドとバックエンドの連携
- CRUDアプリケーションの基礎理解

---

## 📈 Future Improvements（今後の改善）

- タスク完了チェック機能の追加
- UIデザイン改善（CSS強化）
- Reactへのリプレイス
- 認証機能の追加
- PostgreSQLへの移行

---

## ⚠️ Notes（注意事項）

- node_modulesはGitHubに含めていません
- tasks.dbは自動生成されます
- ローカル環境専用アプリです（本番未デプロイ）

---

## 👤 Author

Node.js / Express / SQLite を用いたCRUD機能を持つ学習プロジェクトです。
