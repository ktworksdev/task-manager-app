const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const SECRET_KEY = "your_secret_key";

// JWT認証ミドルウェア
// （後で task-manager-app/middleware/middleware/auth.js に分離予定）
function authMiddleware(req, res, next) {
  // リクエストヘッダーからAuthorization（Bearerトークン）を取得する
  const authHeader = req.headers.authorization;

  // トークンがない場合は認証エラー
  if (!authHeader) {
    return res.status(401).json({ message: "トークンなし" });
  }

  // JWTトークン部分を取得
  const token = authHeader.split(" ")[1];

  try {
    // JWTを検証してユーザー情報を取得する
    const decoded = jwt.verify(token, SECRET_KEY);

    // ユーザー情報をリクエストに追加
    req.user = decoded;
    next();
  } catch (err) {
    // トークンが不正または期限切れ
    return res.status(401).json({ message: "トークン無効" });
  }
}

// 認証付きAPI（JWT必須）
// ・未ログインユーザー → 401エラー（authMiddlewareでブロック）
// ・ログイン済みユーザー → JWT検証後にアクセス可能
// ・JWTから復元されたユーザー情報は req.user に入る
router.get("/", authMiddleware, (req, res) => {
  res.json({
    message: "取得成功",
    user: req.user, // ← このAPIを叩いたユーザー情報（JWT由来）
    data: ["task1", "task2"] // 仮のタスクデータ（Day43用ダミー）
  });
});

module.exports = router;