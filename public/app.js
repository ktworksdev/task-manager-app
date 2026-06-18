// サーバーAPIのURL
const API_URL = "http://localhost:3000/tasks";

// タスク一覧取得
async function loadTasks() {
  // APIから取得
  const res = await fetch(API_URL);

  // JSON化
  const tasks = await res.json();

  // ul要素取得
  const list = document.getElementById("taskList");

  // 一旦空にする
  list.innerHTML = "";

  // 取得したタスクを表示
  tasks.forEach((task) => {
    // li作成
    const li = document.createElement("li");

    // テキスト設定
    const span = document.createElement("span");
    span.textContent = task.title;
    li.appendChild(span);

    // 編集ボタン
    const editButton = document.createElement("button");
    editButton.textContent = "編集";

    // 編集処理
    editButton.addEventListener("click", async () => {
      // promptで新しいタスク名を入力してもらう
      const newTitle = prompt("新しいタスク名");

      // キャンセル or 空文字なら処理終了
      if (!newTitle) return;

      // PUTリクエストをAPIに送信
      await fetch(`http://localhost:3000/tasks/${task.id}`, {
        // HTTPメソッドは PUT（更新）
        method: "PUT",

        // JSONデータを送ることを指定
        headers: {
          "Content-Type": "application/json",
        },

        // サーバーへ送る更新データ
        body: JSON.stringify({
          // 新しいタイトル
          title: newTitle,
        }),
      });

      // 更新後にタスク一覧を再取得して画面更新
      loadTasks();
    });

    // 削除ボタン
    const delBtn = document.createElement("button");
    delBtn.textContent = "削除";

    // 削除処理
    delBtn.onclick = async () => {
      await fetch(`${API_URL}/${task.id}`, {
        method: "DELETE",
      });

      // 再読み込み
      loadTasks();
    };

    // liに追加
    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(delBtn);

    // ulに追加
    list.appendChild(li);
  });
}

// タスク追加
async function addTask() {
  // input取得
  const input = document.getElementById("taskInput");

  // 入力値取得
  const title = input.value;

  // 空なら終了
  if (!title) return;

  // APIへPOST
  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
    }),
  });

  // 入力欄クリア
  input.value = "";

  // 再取得
  loadTasks();
}

// 初回読み込み
loadTasks();