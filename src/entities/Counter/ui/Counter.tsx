import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Button } from '@/shared/ui/deprecated/Button';
import { selectCounterValue } from '../model/selectors/selectCounterValue/selectCounterValue';
import { useCounterActions } from '../model/slice/counterSlice';

export const Counter = () => {
    const counterValue = useAppSelector(selectCounterValue);
    const { increment, decrement } = useCounterActions();
    const handleIncrement = () => {
        increment();
    };

    const handleDecrement = () => {
        decrement();
    };

    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <Button onClick={handleIncrement} data-testid="increment-btn">
                +
            </Button>
            <Button onClick={handleDecrement} data-testid="decrement-btn">
                -
            </Button>
        </div>
    );
};
