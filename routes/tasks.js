const express = require("express");
const router = express.Router();
const db = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

// このrouter配下は全て認証必須
router.use(authMiddleware);

// 認証付きタスク取得API（ユーザーごとに分離）
router.get("/", (req, res) => {
  const userId = req.user.userId;

  db.all(
    "SELECT * FROM tasks WHERE user_id = ?",
    [userId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          message: "取得失敗",
          error: err.message,
        });
      }

      res.json({
        message: "成功",
        data: rows,
      });
    }
  );
});

// 認証付きタスク作成API（user_idを必ず付与）
router.post("/", (req, res) => {
  const { title } = req.body;
  const userId = req.user.userId;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      message: "タスク名を入力してください",
    });
  }

  if (title.length > 30) {
    return res.status(400).json({
      message: "30文字以内で入力してください",
    });
  }

  db.run(
    "INSERT INTO tasks (title, user_id) VALUES (?, ?)",
    [title, userId],
    function (err) {
      if (err) {
        return res.status(500).json({
          message: "作成失敗",
          error: err.message,
        });
      }

      res.json({
        message: "作成成功",
        id: this.lastID,
      });
    }
  );
});

// タスク更新API
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const userId = req.user.userId;
  
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

  // 更新SQL
  const sql = `
    UPDATE tasks
    SET title = ?, completed = ?
    WHERE id = ? AND user_id = ?
  `;

  // 実行
  db.run(
    sql, [title, completed ? 1 : 0, id, userId], function (err) {
      // エラー処理
      if (err) {
        return res.status(500).json({
          message: "更新失敗",
          error: err.message,
        });
      }

      // 更新対象がなかった場合
      if (this.changes === 0) {
        return res.status(404).json({
          message: "タスクが見つかりません",
        });
      }

      // 成功レスポンス
      res.json({      
        message: "更新完了",      
        changes: this.changes,    
      });  
    }
  );
});

// タスク削除API
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const userId = req.user.userId;

  // 削除SQL
  //const sql = "DELETE FROM tasks WHERE id = ?";
  const sql = "DELETE FROM tasks WHERE id = ? AND user_id = ?";

  // 実行
  //db.run(sql, [id], function (err) {
  db.run(sql, [id, userId], function (err) {
      if (err) {
        return res.status(500).json({    
          message: "削除失敗",    
          error: err.message,    
        });   
      }

      // 削除対象がなかった場合
      if (this.changes === 0) {
        return res.status(404).json({
          message: "タスクが見つかりません",
        });
      }
    
      // 成功レスポンス    
      res.json({      
        message: "削除成功",        
        deletedId: id,    
      });  
    }
  );
});

module.exports = router;
