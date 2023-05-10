const _inst: any = {};
interface IProps<T> {
    timeout?: number;
    value: T;
}
export const cacheService = {
    set: <T>(name: string, { timeout = 1 * 60 * 1000, value }: IProps<T>): T => {
        if (!_inst[name] && timeout) {
            setTimeout(() => {
                console.log('reset cache ', name);
                _inst[name] = undefined;
            }, timeout);
        }
        _inst[name] = value;
        return value;
    },

    get: <T>(name: string): T | undefined => {
        return _inst[name] as T;
    },
};
