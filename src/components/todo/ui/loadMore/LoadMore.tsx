import { Button } from "antd";
import { changedToNextPage } from "../../model/model";
import { useUnit } from "effector-react";

const LoadMore = () => {
    const handleLoadNextPage = useUnit(changedToNextPage);

    return (
        <Button type="primary" onClick={handleLoadNextPage}>
            Загрузить еще
        </Button>
    );
};

export default LoadMore;
