import { selectCounterValue } from 'entities/Counter/model/selectors/selectCounterValue/selectCounterValue';
import { counterActions } from 'entities/Counter/model/slice/counterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'shared/ui/Button/Button';

export const Counter = () => {
    const dispatch = useDispatch();
    const counterValue = useSelector(selectCounterValue);
    const increment = () => {
        dispatch(counterActions.increment());
    };

    const decrement = () => {
        dispatch(counterActions.decrement());
    };

    return (
        <div>
            <h1 data-testid="value-title">
                {counterValue}
            </h1>
            <Button
                onClick={increment}
                data-testid="increment-btn"
            >
                +
            </Button>
            <Button
                onClick={decrement}
                data-testid="decrement-btn"
            >
                -
            </Button>
        </div>
    );
};
