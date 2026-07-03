import {
  register
} from "./api.js";

import {
  showError,
  clearError,
  showSuccess
} from "./ui.js";

// フォーム要素を取得
const form = document.getElementById("registerForm");

// フォームが送信されたときの処理
form.addEventListener("submit", async (e) => {

    // フォームの通常送信（ページ再読み込み）を停止
    e.preventDefault();

    // メールアドレス入力欄の値を取得
    const email = document.getElementById("email").value;

    // パスワード入力欄の値を取得
    const password = document.getElementById("password").value;
    clearError();

    try {
        // ユーザー登録処理を実行
        await register(email, password);

        // 登録成功時のメッセージを表示
        showSuccess("登録しました");

        // 1秒後にログイン画面へ移動
        setTimeout(() => {
            location.href = "/login.html";
        }, 1000);

    } catch (err) {

        // 登録失敗時はエラーメッセージを画面に表示
        showError(err.message);
    }
});
