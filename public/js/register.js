import { register } from "./api.js";

// フォーム要素を取得
const form = document.getElementById("registerForm");

// エラーメッセージを表示する要素を取得
const message = document.getElementById("message");

// フォームが送信されたときの処理
form.addEventListener("submit", async (e) => {

    // フォームの通常送信（ページ再読み込み）を停止
    e.preventDefault();

    // メールアドレス入力欄の値を取得
    const email = document.getElementById("email").value;

    // パスワード入力欄の値を取得
    const password = document.getElementById("password").value;

    try {

        // ユーザー登録処理を実行
        await register(email, password);

        // 登録成功時のメッセージを表示
        alert("登録完了");

        // ログインへ画面移動
        location.href = "/login.html";

    } catch (err) {

        // 登録失敗時はエラーメッセージを画面に表示
        message.textContent = err.message;
    }
});