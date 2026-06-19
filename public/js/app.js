import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from "./api.js";

import {
  renderTasks,
  showLoading,
  hideLoading,
  showError,
  clearError,
} from "./ui.js";

// タスク一覧取得
async function loadTasks() {

  clearError(); // 取得開始時に前回のエラー表示をリセットする
  showLoading(); // 通信完了までローディングを表示

  try {
    const tasks = await getTasks();
    // 取得したタスク一覧を画面に表示
    renderTasks(tasks, handleEdit, handleDelete);
  } catch (err) {
    // 通信失敗やサーバーエラー時にエラーメッセージを表示
    showError(err.message || "通信に失敗しました");
  } finally {
    // 成功・失敗に関係なくローディング表示を終了
    hideLoading();
  }
}

// 編集処理
async function handleEdit(task) {
  // promptで新しいタスク名を入力 
  const newTitle = prompt("新しいタスク名", task.title);

  // 空文字チェック
  // キャンセル（null）または空入力（空白のみ含む）なら処理終了
  if (!newTitle || newTitle.trim() ==="") {
    showError("タスクを入力してください");
    return;
  }

   // 文字数制限
  if (newTitle.length > 30) {
    alert("30文字以内で入力してください");
    return;
  }

  // 更新処理
  await updateTask(task.id, newTitle, task.completed);

  // 再読み込み
  loadTasks();
}

// 削除処理
async function handleDelete(id) {
  // 削除処理
  await deleteTask(id);

  // 再読み込み
  loadTasks();
}

// タスク追加
async function addTask() {
  // input取得
  const input = document.getElementById("taskInput");

  const error = document.getElementById("errorMessage");

  // 入力値取得
  const title = input.value.trim();

  // エラーメッセージ初期化
  error.textContent = "";

  // 空文字チェック
  if (title === "") {
    error.textContent = "タスク名を入力してください";
    return;
  }

  // 文字数制限
  if (title.length > 30) {
    error.textContent = "30文字以内で入力してください";
    return;
  }
  
  try {
    await createTask(title);
    input.value = "";
    loadTasks();
  } catch (err) {
    showError(err.message || "追加に失敗しました");
  }
}

// イベント登録
// 追加ボタン
document
.getElementById("addBtn")
.addEventListener("click", addTask);

// 追加ボタンEnterキー対応
document
.getElementById("taskInput")
.addEventListener("keydown",(e) => {  
    if (e.key === "Enter") {
        addTask();
      }
    });

// 初回読み込み
loadTasks();
