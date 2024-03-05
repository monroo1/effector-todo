import { createEffect } from "effector";

export interface ITodo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export const getTodoListFx = createEffect<number, ITodo[]>(
    async (page) =>
        await fetch(
            `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=10`,
        )
            .then((res) => res.json())
            .then((todoList) => todoList),
);

export const createTodoFx = createEffect<string, ITodo>(
    async (todoTitle) =>
        await fetch(`https://jsonplaceholder.typicode.com/todos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: todoTitle,
                completed: false,
                userId: 5,
            }),
        })
            .then((res) => res.json())
            .then((todo) => todo),
);

export const updateTodoFx = createEffect<ITodo, ITodo>(
    async (todo) =>
        await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(todo),
        })
            .then((res) => res.json())
            .then((todo) => todo),
);

export const deleteTodoFx = createEffect<number, object>(
    async (todoId) =>
        await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((todo) => todo),
);
