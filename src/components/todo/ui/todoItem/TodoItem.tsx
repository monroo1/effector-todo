import { Button, List } from "antd";
import { useUnit } from "effector-react";
import {
    $loadingUpdateTodo,
    clickedDeleteTodo,
    clickedUpdateTodo,
} from "../../model/model";
import { ITodo } from "../../model/api";

const TodoItem = ({ item }: { item: ITodo }) => {
    const [handleDeleteTodo, handleUpdateTodo, pending] = useUnit([
        clickedDeleteTodo,
        clickedUpdateTodo,
        $loadingUpdateTodo,
    ]);

    return (
        <List.Item
            actions={[
                item.completed ? (
                    <Button
                        onClick={() =>
                            handleUpdateTodo({ status: false, todoId: item.id })
                        }
                        loading={pending}
                    >
                        Выполнено
                    </Button>
                ) : (
                    <Button
                        onClick={() =>
                            handleUpdateTodo({ status: true, todoId: item.id })
                        }
                        loading={pending}
                        type="primary"
                    >
                        Выполнить
                    </Button>
                ),

                <Button
                    loading={pending}
                    onClick={() => handleDeleteTodo(item.id)}
                    danger
                >
                    Удалить
                </Button>,
            ]}
        >
            <div>{item.todo}</div>
        </List.Item>
    );
};

export default TodoItem;
