// Expressライブラリを読み込む（Webサーバーを作るためのフレームワーク）
const express = require("express");

// CORS（別ドメインからのアクセス許可設定）用ライブラリを読み込む
const cors = require("cors");

// 自作のDBモジュール（SQLite接続済み）を読み込む
const db = require("./db");

// authルート（認証関連の処理）を読み込む
const authRoutes = require("./routes/auth");

// Expressアプリ本体を作成
const app = express();

// publicフォルダを「静的ファイル置き場」として公開する
app.use(express.static("public"));

// CORSを全てのリクエストに対して許可する
app.use(cors());

// JSON形式のリクエストボディを自動で解析する
// これにより req.body でJSONデータが使える
app.use(express.json());

// /auth に来たリクエストを authRoutes に渡す
app.use("/auth", authRoutes);

// ------------------------------
// GET /tasks（タスク一覧取得）
// ------------------------------
app.get("/tasks", (req, res) => {
  // tasksテーブルの全データを取得するSQL
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    // エラーが発生した場合
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    // 成功した場合はデータをJSONで返す
    res.json(rows);
  });
});

// ------------------------------
// POST /tasks（タスク追加）
// ------------------------------
app.post("/tasks", (req, res) => {
  // リクエストボディからtitleを取得
  const { title } = req.body;

  // 空文字チェック
  if (!title || title.trim() === "") {
    return res.status(400).json({
      error: "タスク名を入力してください",
    });
  }

  // 文字数制限
  if (title.length > 30) {
    return res.status(400).json({
      error: "30文字以内で入力してください",
    });
  }

  // データベースに挿入
  db.run("INSERT INTO tasks (title) VALUES (?)", [title], function (err) {
    // エラー処理
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    // 成功レスポンス（追加されたIDを返す）
    res.json({
      id: this.lastID,
      title: title,
    });
  });
});

// ------------------------------
// DELETE /tasks/:id（タスク削除）
// ------------------------------
app.delete("/tasks/:id", (req, res) => {
  // URLパラメータからidを取得
  const id = req.params.id;

  // 削除SQL
  const sql = "DELETE FROM tasks WHERE id = ?";

  // 実行
  db.run(sql, [id], function (err) {
    // エラー処理
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    // 削除対象がなかった場合
    if (this.changes === 0) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // 成功レスポンス
    res.json({
      message: "Task deleted",
      deletedId: id,
    });
  });
});

// ------------------------------
// PUT /tasks/:id（タスク更新）
// ------------------------------
app.put("/tasks/:id", (req, res) => {
  // URLパラメータからid取得
  const { id } = req.params;

  // リクエストボディからtitleとcompletedを取得
  const { title, completed = 0 } = req.body;

  // 空文字チェック
  if (!title || title.trim() === '') {
    return res.status(400).json({
      error: 'タスク名を入力してください'
    });
  }

  // 文字数制限
  if (title.length > 30) {
    return res.status(400).json({
      error: '30文字以内で入力してください'
    });
  }
  
  // 更新SQL
  const sql = `
    UPDATE tasks
    SET title = ?, completed = ?
    WHERE id = ?
  `;

  // 実行
  db.run(sql, [title, completed, id], function (err) {
    // エラー処理
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // 成功レスポンス（更新件数）
    res.json({
      message: "更新完了",
      changes: this.changes,
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