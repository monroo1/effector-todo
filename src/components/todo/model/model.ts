import { attach, createEvent, createStore, sample } from "effector";
import {
    ITodo,
    getTodoListFx,
    createTodoFx,
    deleteTodoFx,
    updateTodoFx,
} from "./api";
import { createGate } from "effector-react";
import { or, reset } from "patronum";

export const changedValue = createEvent<string>();
export const submittedForm = createEvent();
export const changedToNextPage = createEvent();
export const createTodoClicked = createEvent();
export const clickedDeleteTodo = createEvent<number>();
export const clickedUpdateTodo = createEvent<{
    status: boolean;
    todoId: number;
}>();

export const $inputValue = createStore("");
export const $todoList = createStore<[] | ITodo[]>([]);
export const $currentPage = createStore(1);
export const $loadingUpdateTodo = or(
    deleteTodoFx.pending,
    updateTodoFx.pending,
);

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
    fn: (todoListPrev, { result }) =>
        todoListPrev.filter((todo) => todo.id !== result.id),
    target: $todoList,
});

reset({
    clock: createTodoFx.done,
    target: $inputValue,
});
