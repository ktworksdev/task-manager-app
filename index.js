// .envファイルを読み込み、環境変数を有効化する
require("dotenv").config();

// Expressライブラリを読み込む（Webサーバーを作るためのフレームワーク）
const express = require("express");

// CORS（別ドメインからのアクセス許可設定）用ライブラリを読み込む
const cors = require("cors");

// authルート（認証関連の処理）を読み込む
const authRoutes = require("./routes/auth");

// tasksルートを読み込む
const taskRoutes = require("./routes/tasks");

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
app.use("/api/tasks", taskRoutes);

// ------------------------------
// サーバー起動
// ------------------------------
app.listen(3000, () => {
  // サーバー起動メッセージ
  console.log("Server started on http://localhost:3000");
});
