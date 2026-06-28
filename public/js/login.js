import {
  setLoading,
  showError, 
  clearError
 } from "./ui.js";

// HTMLの読み込みが完了したら処理を開始
document.addEventListener("DOMContentLoaded", () => {

  const loginForm = document.getElementById("loginForm");
  const btn = document.getElementById("loginBtn");

  // フォームが送信されたときの処理
  loginForm.addEventListener("submit", async (e) => {

    // フォームの通常送信（ページ再読み込み）を停止
    e.preventDefault();

    // メールアドレス入力欄の値を取得
    const email = document.getElementById("email").value;

    // パスワード入力欄の値を取得
    const password = document.getElementById("password").value;

    clearError();
    setLoading(btn, true);

    try {

      // ログインAPIへPOSTリクエストを送信
      const response = await fetch("/api/auth/login", {

        // HTTPメソッドをPOSTに指定
        method: "POST",

        // 送信データがJSON形式であることを指定
        headers: {
          "Content-Type": "application/json"
        },

        // メールアドレスとパスワードをJSON文字列に変換して送信
        body: JSON.stringify({
          email,
          password
        })
      });

      // サーバーから返ってきたJSONデータを取得
      const data = await response.json();

      // ステータスコードが200番台以外ならエラーにする
      if (!response.ok) {
        throw new Error(data.message);
      }

      // ログイン成功時にJWTトークンをブラウザに保存
      localStorage.setItem("token", data.token);

      // トップページへ画面遷移
      window.location.href = "/";

    } catch (err) {

      // エラー内容をコンソールに出力（開発者向け）
      console.error("エラー:", err);

      // エラーメッセージを画面に表示
      showError(err.message);

    } finally {
      setLoading(btn, false);
    }
  });
});
