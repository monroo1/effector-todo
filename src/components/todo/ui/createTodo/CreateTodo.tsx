import { useUnit } from "effector-react";
import {
    $inputValue,
    changedValue,
    createTodoClicked,
} from "../../model/model";
import { Button, Input, Space } from "antd";
import { createTodoFx } from "../../model/api";

const CreateTodo = () => {
    const [value, handleCreateTodo, pending] = useUnit([
        $inputValue,
        createTodoClicked,
        createTodoFx.pending,
    ]);

    return (
        <Space.Compact style={{ width: "100%" }}>
            <Input
                value={value}
                placeholder="Введите название Todo"
                onChange={(e) => changedValue(e.target.value)}
                disabled={pending}
            />
            <Button type="primary" loading={pending} onClick={handleCreateTodo}>
                Создать
            </Button>
        </Space.Compact>
    );
};

export default CreateTodo;
