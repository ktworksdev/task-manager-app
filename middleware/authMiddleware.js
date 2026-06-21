const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";

// JWT認証ミドルウェア
const authMiddleware = (req, res, next) => {
  // リクエストヘッダーからAuthorization（Bearerトークン）を取得する
  const authHeader = req.headers.authorization;

  // トークンがない場合は認証エラー
  if (!authHeader) {
    return res.status(401).json({ message: "トークンなし" });
  }

  // JWTトークン部分を取得
  const token = authHeader.split(" ")[1];

  // tokenが存在しない場合（Bearerの後ろが空 or 形式が壊れている）
  if (!token) {
    return res.status(401).json({ message: "形式エラー" });
  }

  try {
    // JWTを検証してユーザー情報を取得する
    const decoded = jwt.verify(token, SECRET_KEY);

    // ユーザー情報をリクエストに追加
    req.user = decoded;
    next();
  } catch (err) {
    // トークンが不正または期限切れ
    return res.status(403).json({ message: "トークン無効" });
  }
};

module.exports = authMiddleware;