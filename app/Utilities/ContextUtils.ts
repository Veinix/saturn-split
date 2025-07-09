function withLoading<T extends (...args: any[]) => Promise<any>>(
    setLoading: (b: boolean) => void,
    fn: T
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
    return async (...args: Parameters<T>) => {
        setLoading(true);
        try {
            const result = await fn(...args);
            return result;
        } finally {
            setLoading(false);
        }
    }
}

export {
    withLoading
}