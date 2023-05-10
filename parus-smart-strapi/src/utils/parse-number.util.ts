export const parseNumber = (current: string | undefined): number => {
    if (current) {
        const res = current.replace(',', '.').replace(/[\s]/g, '');
        return +res;
    }
    return 0;
};
