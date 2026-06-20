const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

// 新規ユーザー登録API
router.post("/register", (req, res) => {
  const { email, password } = req.body;

  // 入力チェック
  if (!email || !password) {
    return res.status(400).json({
      message: "emailとpasswordは必須です",
    });
  }

  // 既存ユーザー確認
  const checkSql = "SELECT * FROM users WHERE email = ?";
  
  db.get(checkSql, [email], (err, user) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    // すでに存在する場合
    if (user) {
      return res.status(409).json({
        message: "このメールアドレスは既に登録されています",
      });
    }

    // 新規ユーザー登録（bcryptハッシュ化対応）
    const insertSql = `
      INSERT INTO users (email, password)
      VALUES (?, ?)
    `;

    bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
      if (hashErr) {
        return res.status(500).json({
          message: "bcryptエラー",
        });
      }

      db.run(insertSql, [email, hashedPassword], function (err) {
        if (err) {
          return res.status(500).json({
            message: "ユーザー作成失敗",
            error: err.message,
          });
        }

        // 成功レスポンス
        return res.status(201).json({
          message: "ユーザー登録成功",
          user: {
            id: this.lastID,
            email: email,
          },
        });
      });
    });
  });
});


// ログインAPI
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // 入力チェック
  if (!email || !password) {
    return res.status(400).json({
      message: "emailとpasswordは必須です",
    });
  }

  // 既存ユーザー確認
  const checkSql = "SELECT * FROM users WHERE email = ?";

  db.get(checkSql, [email], (err, user) => {
    // DBエラー
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    // ユーザーが存在しない
    if (!user) {
      return res.status(401).json({
        message: "メールアドレスまたはパスワードが違います",
      });
    }

    // パスワード確認（bcrypt対応）
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({
          message: "bcryptエラー",
        });
      }

      if (!isMatch) {
        return res.status(401).json({
          message: "メールアドレスまたはパスワードが違います",
        });
      }

      // ログイン成功
      return res.status(200).json({
        message: "ログイン成功",
        user: {
          id: user.id,
          email: user.email,
        },
      });
    });
  });
});

module.exports = router;
