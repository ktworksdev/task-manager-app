// サーバーAPIのURL
const API_URL = "http://localhost:3000/tasks"
    
// UI要素取得
const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");

// ローディング表示
function showLoading() {
  loading.classList.remove("hidden");
}

// ローディング表示/非表示
function hideLoading() {
  loading.classList.add("hidden");
}

// エラー表示
function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.remove("hidden");
}

// エラー非表示
function clearError() {
  errorBox.textContent = "";
  errorBox.classList.add("hidden");
}

// タスク一覧取得
async function loadTasks() {

  clearError();  // 取得開始時に前回のエラー表示をリセットする
  showLoading(); // 通信完了までローディングを表示

  try {
  // APIへリクエストを送信してタスク一覧を取得
  const res = await fetch("http://localhost:3000/tasks");

  // HTTPステータスが 200番台以外ならエラーとして扱う
  if (!res.ok) {
    throw new Error("サーバーエラーが発生しました");
  }

  // レスポンス(JSON)をJavaScriptオブジェクトへ変換
  const tasks = await res.json();

  // 取得したタスク一覧を画面に表示
  renderTasks(tasks);

 } catch (err) {
  // 通信失敗やサーバーエラー時にエラーメッセージを表示
  showError(err.message || "通信に失敗しました");

 } finally {
  // 成功・失敗に関係なくローディング表示を終了
  hideLoading();
 }
}

// タスク一覧描画
function renderTasks(tasks) {

  const list = document.getElementById("taskList")
  list.innerHTML = ""

  if (!tasks || tasks.length === 0) {
    list.innerHTML = "<li>タスクがありません</li>"
    return
  }

  tasks.forEach(task => {

    // タスクを表示するカード(div)を作成
    // task-card クラスを設定してスタイルを適用
    const card = document.createElement("div")
    card.className = "task-card"

    // テキスト設定
    const title = document.createElement("div")
    title.className = "task-title"
    title.textContent = task.title

    // 完了状態に応じてクラスと表示テキストを切り替え
    const statusClass = task.completed ? "completed" : "pending"
    const statusText = task.completed ? "完了" : "未完了"

    // ステータス設定
    const status = document.createElement("div");
    status.className = statusClass
    status.textContent = statusText

    // ボタン設定
    const actions = document.createElement("div")
    actions.className = "task-actions"

    // 編集ボタン
    const editButton = document.createElement("button")
    editButton.textContent = "編集"

    editButton.onclick = async () => {

       // promptで新しいタスク名を入力
      const newTitle = prompt("新しいタスク名")

      // キャンセル or 空文字なら処理終了
      if (!newTitle) return

      // PUTリクエストをAPIに送信
      // task.id のタスクを更新する
      await fetch(`http://localhost:3000/tasks/${task.id}`, {
        
        // HTTPメソッドは PUT（更新）
        method: "PUT",

        // JSONデータを送ることを指定
        headers: {
          "Content-Type": "application/json"
        },
            
        // サーバーへ送る更新データ
        body: JSON.stringify({
          // 新しいタイトル
          title: newTitle,
          completed: task.completed
        })
      })

      // 再読み込み
      loadTasks()
    }

    // 削除ボタン
    const delBtn = document.createElement("button")
    delBtn.textContent = "削除"

    // 削除処理
    delBtn.onclick = async () => {

      await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "DELETE"
      })

      // 再読み込み
      loadTasks()
    }

    // タイトルと操作ボタンをカードに追加してリストへ表示
    actions.appendChild(editButton)
    actions.appendChild(delBtn)

    card.appendChild(title)
    card.appendChild(status)
    card.appendChild(actions)

    list.appendChild(card)
  })
}

// タスク追加
async function addTask() {

  // input取得
  const input = document.getElementById("taskInput");

  const error = document.getElementById('errorMessage');

  // 入力値取得
  const title = input.value.trim();

  // エラーメッセージ初期化
  error.textContent = '';

  // 空文字チェック
    if (title === '') {
    error.textContent = 'タスク名を入力してください';
    return;
  }

  // 文字数制限
  if (title.length > 30) {
    error.textContent = '30文字以内で入力してください';
    return;
  }

  // APIへPOST
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title
      })
    });

    const data = await response.json();

    // サーバーエラー表示
    if (!response.ok) {
      error.textContent = data.error;
      return;
    }

    input.value = '';

    loadTasks();

  } catch (err) {
    error.textContent = '通信エラーが発生しました';
  }
}

// 初回読み込み
loadTasks();