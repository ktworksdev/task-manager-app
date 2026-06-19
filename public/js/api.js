const API_URL = "http://localhost:3000/tasks";

// タスク一覧を取得する
export async function getTasks() {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("サーバーエラーが発生しました");
  }

  return res.json();
}

// タスクを追加する
export async function createTask(title) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  return res.json();
}

// タスクを更新する
export async function updateTask(id, title, completed) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      completed,
    }),
  });
}

// タスクを削除する
export async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}