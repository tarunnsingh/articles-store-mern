export default {
  getTodos: () => {
    return fetch("/user/todos").then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else {
        return response.json({
          message: { msgBody: "Unauthorized", msgError: true },
        });
      }
    });
  },
  postTodo: (todo) => {
    todo["tags"] = todo["tags"].split(",").map((s) => s.trim());
    return fetch("/user/todo", {
      method: "post",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else {
        return response.json({
          message: { msgBody: "Unauthorized", msgError: true },
        });
      }
    });
  },

  deleteTodo: (id) => {
    return fetch(`/user/todo/${id}`, {
      method: "delete",
    }).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else {
        return response.json({
          message: { msgBody: "Unauthorized", msgError: true },
        });
      }
    });
  },

  getArticlesOnHomePage: () => {
    return fetch("/articles/all").then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else {
        return response.json({
          message: { msgBody: "Unauthorized", msgError: true },
        });
      }
    });
  },
};
