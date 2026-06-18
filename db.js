// SQLite3ライブラリを読み込む（詳細ログ付きモードを有効化）
const sqlite3 = require("sqlite3").verbose();

// tasks.dbというファイルに接続してデータベースを開く
// 接続に成功・失敗どちらでもコールバックが実行される
const db = new sqlite3.Database("./tasks.db", (err) => {
  // エラーが発生した場合の処理
  if (err) {
    // エラー内容を表示して処理を終了する
    return console.error(err.message);
  }

  // データベース接続が成功したときのメッセージ
  console.log("SQLite connected");
});

// SQLを順番に安全に実行するためのブロック
db.serialize(() => {
  // tasksテーブルを作成するSQL（存在しない場合のみ作成）
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT, -- 自動で増えるID
      title TEXT NOT NULL,                  -- タスクの内容（必須）
      completed INTEGER DEFAULT 0           -- 完了状態（0=未完了 / 1=完了）
    )
  `);
});

// db（データベース接続オブジェクト）を他のファイルから使えるように公開する
module.exports = db;