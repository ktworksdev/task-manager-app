// expressを読み込む
const express = require("express");

// ルーター機能を作成
const router = express.Router();

/*
  仮の確認用API
  → /auth にアクセスできているか確認するためのテスト
*/

// GET /auth にアクセスしたときの処理
router.get("/", (req, res) => {
  res.json({
    message: "Auth Route OK"
  });
});

// このルーターを外部で使えるように公開する
module.exports = router;