const safeAssign = <T>(possibleValue: T, backupValue: T): T => {
    return possibleValue ?? backupValue
}


const safeAwait = async <T>(promise: Promise<T>): Promise<[T, null] | [null, Error]> => {
    try {
        const data = await promise
        return [data, null]
    } catch (error: any) {
        // if (errorHandler) errorHandler(error)
        return [null, error]
    }
}

function debounce<T extends (...args: any[]) => any>(
    fn: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    return (...args: Parameters<T>) => {
        if (timeoutId !== null) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn(...args);
        }, wait);
    };
}

export {
    safeAssign,
    debounce
}