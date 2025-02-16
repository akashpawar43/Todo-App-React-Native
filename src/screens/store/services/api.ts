export const fetchTodosReq = async () => {
    const response = await fetch("https://todo-redux-backend.vercel.app/");
    return response.json();
};

export const fetchSingleTodoReq = async (action: any) => {
    const response = await fetch(`https://todo-redux-backend.vercel.app/todo/${action.payload}`);
    return response.json();
};

export const addTodoReq = async (todo: any) => {
    const response = await fetch("https://todo-redux-backend.vercel.app/add", {
        method: "POST",
        body: JSON.stringify(todo),
        headers: { "Content-Type": "application/json" }
    });
    return response.json();
};

export const updateTodoReq = async (todo: any) => {
    const response = await fetch(`https://todo-redux-backend.vercel.app/todos/${todo.id}`, {
        method: "patch",
        body: JSON.stringify(todo),
        headers: { "Content-Type": "application/json" }
    });
    return response.json();
};

export const deleteTodoReq = async (action: any) => {
    const response = await fetch(`https://todo-redux-backend.vercel.app/delete/${action.payload}`, {
        method: "delete",
        headers: { "Content-Type": "application/json" }
    });
    return response.json();
};
