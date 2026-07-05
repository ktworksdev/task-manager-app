// APIのURL（現在のサイトを基準にアクセスする）
const API_URL = "/api/tasks";

//ローカルストレージから認証トークンを取得する
function getToken() {
  return localStorage.getItem("token");
}

// 共通fetch処理（401・403時は自動ログアウト）
async function apiFetch(url, options = {}) {
  const response = await fetch(url, options);

  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem("token");

        localStorage.setItem(
      "errorMessage",
      "ログイン期限が切れました。再度ログインしてください。"
    );
    location.href = "/login.html";

    return null;
  }

  return response;
}

// ログインAPI
export async function login(email, password) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "ログインに失敗しました");
  }

  return data;
}

// 新規ユーザーを登録する
export async function register(email, password) {

    const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    const data = await response.json();

    // HTTPステータスが200番台以外ならエラーとして処理
    if (!response.ok) {
      throw new Error(data.message || "登録に失敗しました");  
    }

    return data;
}

// タスク一覧を取得する
export async function getTasks() {
  
  const res = await apiFetch(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  
  if (!res) return;
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "サーバーエラーが発生しました");
  }

  return res.json();
}

// タスクを追加する
export async function createTask(title) {
  
  const res = await apiFetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ title }),
  });
  
  if (!res) return;

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "追加に失敗しました");
  }
  return res.json();
}

// タスクを更新する
export async function updateTask(id, title, completed) {
  
  const res = await apiFetch(`${API_URL}/${id}`, {
  
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
  
  if (!res) return;
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "更新に失敗しました");
  }
}

// タスクを削除する
export async function deleteTask(id) {
  
  const res = await apiFetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  
  if (!res) return;

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "削除に失敗しました");
  }  
}
