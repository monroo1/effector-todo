import { createEffect } from "effector";

export interface ITodo {
    userId: number;
    id: number;
    todo: string;
    completed: string;
}

export const getTodoListFx = createEffect<number, ITodo[]>(
    async (page) =>
        await fetch(
            `https://dummyjson.com/todos?skip=${page * 10 - 10}&limit=10`,
        )
            .then((res) => res.json())
            .then((res) => res.todos),
);

export const createTodoFx = createEffect<string, ITodo>(
    async (todoTitle) =>
        await fetch(`https://dummyjson.com/todos/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                todo: todoTitle,
                completed: false,
                userId: 5,
            }),
        })
            .then((res) => res.json())
            .then((todo) => todo),
);

export const updateTodoFx = createEffect<
    { todoId: number; status: boolean },
    ITodo
>(
    async ({ todoId, status }) =>
        await fetch(`https://dummyjson.com/todos/${todoId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                completed: status,
            }),
        })
            .then((res) => res.json())
            .then((todo) => todo),
);

export const deleteTodoFx = createEffect<number, ITodo>(
    async (todoId) =>
        await fetch(`https://dummyjson.com/todos/${todoId}`, {
            method: "delete",
        })
            .then((res) => res.json())
            .then((todo) => todo),
);
