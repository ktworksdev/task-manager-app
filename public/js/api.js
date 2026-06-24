const API_URL = "http://localhost:3000/api/tasks";

//ローカルストレージから認証トークンを取得する
function getToken() {
  return localStorage.getItem("token");
}

// タスク一覧を取得する
export async function getTasks() {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "サーバーエラーが発生しました");
  }

  return res.json();
}

// タスクを追加する
export async function createTask(title) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ title }),
  });  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "追加に失敗しました");
  }
  return res.json();
}

// タスクを更新する
export async function updateTask(id, title, completed) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({
      title,
      completed,
    }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "更新に失敗しました");
  }
}

// タスクを削除する
export async function deleteTask(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "削除に失敗しました");
  }  
}