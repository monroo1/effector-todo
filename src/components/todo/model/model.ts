import { attach, createEvent, createStore, sample } from "effector";
import {
    ITodo,
    getTodoListFx,
    createTodoFx,
    deleteTodoFx,
    updateTodoFx,
} from "./api";
import { createGate } from "effector-react";
import { reset } from "patronum";

export const changedValue = createEvent<string>();
export const submittedForm = createEvent();
export const changedToNextPage = createEvent();
export const createTodoClicked = createEvent();
export const clickedDeleteTodo = createEvent<number>();
export const clickedUpdateTodo = createEvent<ITodo>();

export const $inputValue = createStore("");
export const $todoList = createStore<[] | ITodo[]>([]);
export const $currentPage = createStore(1);
export const $pendingTodos = createStore<number[]>([]);

export const initTodoListGate = createGate();

$inputValue.on(changedValue, (_, value) => value);
$currentPage.on(changedToNextPage, (page) => page + 1);

export const getTodoListPageFx = attach({
    source: { page: $currentPage },
    async effect({ page }) {
        return getTodoListFx(page);
    },
});

sample({
    source: $todoList,
    clock: getTodoListPageFx.done,
    fn: (todoListPrev, { result }) => [...todoListPrev, ...result],
    target: $todoList,
});

sample({
    clock: [initTodoListGate.open, $currentPage],
    target: getTodoListPageFx,
});

sample({
    clock: createTodoClicked,
    fn: () => $inputValue.getState(),
    target: createTodoFx,
});

sample({
    source: $todoList,
    clock: createTodoFx.done,
    fn: (todoListPrev, { result }) => [...todoListPrev, result],
    target: $todoList,
});

sample({
    clock: clickedUpdateTodo,
    target: updateTodoFx,
});

sample({
    source: $todoList,
    clock: updateTodoFx.done,
    fn: (todoListPrev, { result }) =>
        todoListPrev.map((todo) => (todo.id === result.id ? result : todo)),
    target: $todoList,
});

sample({
    clock: clickedDeleteTodo,
    target: deleteTodoFx,
});

sample({
    source: $todoList,
    clock: deleteTodoFx.done,
    fn: (todoListPrev, effectDone) =>
        todoListPrev.filter((todo) => todo.id !== effectDone.params.valueOf()),
    target: $todoList,
});

sample({
    clock: [updateTodoFx, deleteTodoFx],
    source: $pendingTodos,
    fn: (pending, params) => [
        ...pending,
        typeof params === "number" ? params : params.id,
    ],
    target: $pendingTodos,
});

sample({
    clock: [updateTodoFx.finally, deleteTodoFx.finally],
    source: $pendingTodos,
    fn: (pending, { params }) =>
        pending.filter((id) => {
            if (typeof params === "number") return id !== params;
            return id !== params.id;
        }),
    target: $pendingTodos,
});

reset({
    clock: createTodoFx.done,
    target: $inputValue,
});
