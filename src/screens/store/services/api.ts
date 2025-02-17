import Toast from "react-native-toast-message";

type ZodFieldError = {
    _errors: string[];
};

type ZodErrorResponse = {
    // error: {
    _errors: string[];
    title?: ZodFieldError;
    description?: ZodFieldError;
    // };
};

export const fetchTodosReq = async () => {
    const response = await fetch("https://todo-redux-backend.vercel.app/");
    return response.json();
};

export const fetchSingleTodoReq = async (action: any) => {
    const response = await fetch(`https://todo-redux-backend.vercel.app/todo/${action.payload}`);
    return response.json();
};

export const addTodoReq = async (todo: any) => {
    try {
        const response = await fetch("https://todo-redux-backend.vercel.app/add", {
            method: "POST",
            body: JSON.stringify(todo),
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        if (!response.ok) {
            const errorResponse = data.error as ZodErrorResponse
            const showErrors = Object.values(errorResponse)
                .flatMap(item =>
                    Array.isArray(item) ? item : item._errors ?? []
                ).join('\n');

            throw new Error(showErrors);
        }
        return data;
    } catch (error) {
        console.log("error:", error)
        const errMsg = error instanceof Error ? error.message : "An unexpected error occurred";
        throw new Error(errMsg);
    }
};

export const updateTodoReq = async (todo: any) => {
    try {
        const Body = {
            title: todo?.title,
            description: todo?.description,
            dueDate: todo?.dueDate,
            priority: todo?.priority,
            status: todo?.status,
            category: todo?.category,
        }
        const response = await fetch(`https://todo-redux-backend.vercel.app/todo/${todo._id}`, {
            method: "patch",
            body: JSON.stringify(Body),
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        if (!response.ok) {
            const errorResponse = data.error as ZodErrorResponse
            const showErrors = Object.values(errorResponse)
                .flatMap(item =>
                    Array.isArray(item) ? item : item._errors ?? []
                ).join('\n');

            throw new Error(showErrors);
        }
        return data;
    } catch (error) {
        console.log("error:", error)
        const errMsg = error instanceof Error ? error.message : "An unexpected error occurred";
        throw new Error(errMsg);
    }
};

export const deleteTodoReq = async (action: any) => {
    try {
        const response = await fetch(`https://todo-redux-backend.vercel.app/delete/${action.payload}`, {
            method: "delete",
            headers: { "Content-Type": "application/json" }
        });
        const data = response.json();
        if (!response.ok) throw new Error("Failed to delete todo")
        return data;
    } catch (error) {
        console.log("error:", error)
        const errMsg = error instanceof Error ? error.message : "An unexpected error occurred";
        throw new Error(errMsg);
    }
};
