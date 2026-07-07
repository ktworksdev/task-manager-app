// SQLite3ライブラリを読み込む（詳細ログ付きモードを有効化）
const sqlite3 = require("sqlite3").verbose();

const path = require("path");

// DBパスを環境変数から取得する
const DB_PATH = process.env.DB_PATH || path.join(__dirname, "tasks.db");

// データベースを開く
const db = new sqlite3.Database(DB_PATH, (err) => {
//const db = new sqlite3.Database("./tasks.db", (err) => {
  
  // エラーが発生した場合の処理
  if (err) {
    // エラー内容を表示して処理を終了する
    return console.error(err.message);
  }

  // 外部キー制約を有効化する
  db.run("PRAGMA foreign_keys = ON");
  
  // データベース接続が成功したときのメッセージ
  console.log("SQLite connected");  
});

// SQLを順番に安全に実行するためのブロック
db.serialize(() => {
  // usersテーブル作成（認証用ユーザー情報）
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT, -- 自動で増えるID
      email TEXT UNIQUE NOT NULL,           -- ログイン用メールアドレス（重複不可）
      password TEXT NOT NULL,               -- ハッシュ化されたパスワード
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP -- 作成日時（自動付与）
    )
  `);

 // tasksテーブル作成（存在しない場合のみ作成）
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT, -- 自動で増えるID
      title TEXT NOT NULL,                  -- タスクの内容（必須）
      completed INTEGER DEFAULT 0,          -- 完了状態（0=未完了 / 1=完了）
      user_id INTEGER NOT NULL,             -- 所属ユーザーID（必須）
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 作成日時（自動付与）
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 更新日時（自動付与）
      FOREIGN KEY(user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
    )
  `);
});

// db（データベース接続オブジェクト）を他のファイルから使えるように公開する
module.exports = db;
