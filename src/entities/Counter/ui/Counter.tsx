import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Button } from '@/shared/ui/Button';
import { selectCounterValue } from '../model/selectors/selectCounterValue/selectCounterValue';
import { counterActions } from '../model/slice/counterSlice';

export const Counter = () => {
    const dispatch = useAppDispatch();
    const counterValue = useAppSelector(selectCounterValue);
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
