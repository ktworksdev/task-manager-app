// Expressライブラリを読み込む（Webサーバーを作るためのフレームワーク）
const express = require("express");

// CORS（別ドメインからのアクセス許可設定）用ライブラリを読み込む
const cors = require("cors");

// 自作のDBモジュール（SQLite接続済み）を読み込む
const db = require("./db");

// authルート（認証関連の処理）を読み込む
const authRoutes = require("./routes/auth");

// JWT（JSON Web Token）を扱うためのライブラリを読み込む（トークン認証用）
const jwt = require("jsonwebtoken");

// tasksルートを読み込む
const taskRoutes = require("./routes/tasks");

// authmiddlewareを読み込む
const authMiddleware = require("./middleware/authmiddleware");

const SECRET_KEY = "your_secret_key"; // 本番は.envに移す

// Expressアプリ本体を作成
const app = express();

// publicフォルダを「静的ファイル置き場」として公開する
app.use(express.static("public"));

// CORSを全てのリクエストに対して許可する
app.use(cors());

// JSON形式のリクエストボディを自動で解析する
app.use(express.json());

// /auth に来たリクエストを authRoutes に渡す
app.use("/api/auth", authRoutes);

// tasksルーティングを追加（認証付きAPI）
app.use("/tasks", taskRoutes);

// JWT認証を適用したタスク取得API（後で routes/tasks.js に分離予定）
app.get("/tasks-secure", authMiddleware, (req, res) => {
  // DBから全タスクを取得
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    // SQLエラー時は500返す
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // 成功レスポンス
    res.json({
      message: "取得成功",
      user: req.user, // 認証済みユーザー情報
      data: rows,     // タスク一覧
    });
  });
});

// ------------------------------
// サーバー起動
// ------------------------------
app.listen(3000, () => {
  // サーバー起動メッセージ
  console.log("Server started on http://localhost:3000");
});
