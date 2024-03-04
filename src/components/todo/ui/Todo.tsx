import { useGate, useUnit } from "effector-react";
import { $todoList, initTodoListGate, getTodoListPageFx } from "../model/model";
import { List } from "antd";
import LoadMore from "./loadMore/LoadMore";
import CreateTodo from "./createTodo/CreateTodo";
import TodoItem from "./todoItem/TodoItem";

const Todo = () => {
    const [todoList, isLoading] = useUnit([
        $todoList,
        getTodoListPageFx.pending,
    ]);

    useGate(initTodoListGate);

    return (
        <>
            <CreateTodo />
            <List
                className="demo-loadmore-list"
                loading={isLoading}
                itemLayout="horizontal"
                loadMore={<LoadMore />}
                dataSource={todoList}
                renderItem={(item) => <TodoItem item={item} />}
            />
        </>
    );
};

export default Todo;
