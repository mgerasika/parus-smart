interface IProps<T> {
    inputItems: T[];
    currentPage: number;
}

export function calcPaging<T>({ inputItems, currentPage }: IProps<T>): {
    totalPages: number;
    items: T[];
} {
    const SIZE = 5;
    const totalPages = Math.ceil(inputItems?.length / SIZE);
    const items = inputItems ? inputItems?.slice(currentPage * SIZE, currentPage * SIZE + SIZE) : [];
    return { totalPages, items: items || [] };
}
