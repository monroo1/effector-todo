import { Button, List } from "antd";
import { useUnit } from "effector-react";
import {
    $pendingTodos,
    clickedDeleteTodo,
    clickedUpdateTodo,
} from "../../model/model";
import { ITodo } from "../../model/api";

const TodoItem = ({ item }: { item: ITodo }) => {
    const [handleDeleteTodo, handleUpdateTodo, pendingTodos] = useUnit([
        clickedDeleteTodo,
        clickedUpdateTodo,
        $pendingTodos,
    ]);

    return (
        <List.Item
            actions={[
                item.completed ? (
                    <Button
                        onClick={() =>
                            handleUpdateTodo({ ...item, completed: false })
                        }
                        loading={pendingTodos.includes(item.id)}
                    >
                        Выполнено
                    </Button>
                ) : (
                    <Button
                        onClick={() =>
                            handleUpdateTodo({ ...item, completed: true })
                        }
                        loading={pendingTodos.includes(item.id)}
                        type="primary"
                    >
                        Выполнить
                    </Button>
                ),

                <Button
                    loading={pendingTodos.includes(item.id)}
                    onClick={() => handleDeleteTodo(item.id)}
                    danger
                >
                    Удалить
                </Button>,
            ]}
        >
            <div>{item.title}</div>
        </List.Item>
    );
};

export default TodoItem;
