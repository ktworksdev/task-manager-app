// UI要素取得
const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");

// ローディング表示
export function showLoading() {
  loading.classList.remove("hidden");
}

// ローディング表示/非表示
export function hideLoading() {
  loading.classList.add("hidden");
}

// エラー表示
export function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.remove("hidden");
}

// エラー非表示
export function clearError() {
  errorBox.textContent = "";
  errorBox.classList.add("hidden");
}

// タスク一覧描画
export function renderTasks(tasks, onEdit, onDelete) {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  if (!tasks || tasks.length === 0) {
    list.innerHTML = "<li>タスクがありません</li>";
    return;
  }

  tasks.forEach((task) => {
    // タスクを表示するカード(div)を作成
    const card = document.createElement("div");
    card.className = "task-card";

    // テキスト設定
    const title = document.createElement("div");
    title.className = "task-title";
    title.textContent = task.title;

    // ステータス設定
    const status = document.createElement("div");
    // 完了状態に応じてクラスと表示テキストを切り替え
    status.className = task.completed ? "completed" : "pending";
    status.textContent = task.completed ? "完了" : "未完了";

    // ボタン設定
    const actions = document.createElement("div");
    actions.className = "task-actions";

    // 編集ボタン
    const editBtn = document.createElement("button");
    editBtn.textContent = "編集";
    editBtn.onclick = () => onEdit(task);

    // 削除ボタン
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";
    deleteBtn.onclick = () => onDelete(task.id);

    // タイトルと操作ボタンをカードに追加してリストへ表示
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    card.appendChild(title);
    card.appendChild(status);
    card.appendChild(actions);

    list.appendChild(card);
  });
}
