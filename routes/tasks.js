const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const SECRET_KEY = "your_secret_key";

// 認証付きタスク取得API（ユーザーごとに分離）
router.get("/", authMiddleware, (req, res) => {
  const userId = req.user.id;

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
router.post("/", authMiddleware, (req, res) => {
  const { title } = req.body;
  const userId = req.user.id;

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

// JWT認証必須のダミーAPI（検証用）
router.get("/secure-test", authMiddleware, (req, res) => {
  res.json({
    message: "取得成功",
    user: req.user,
  });
});

module.exports = router;
