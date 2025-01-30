import { useState, useEffect } from 'react';
export function useDebounce(value, time=500) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, time);
        return () => {
            clearTimeout(timeout);
        };
    }, [value, time]);
    return debouncedValue;
}