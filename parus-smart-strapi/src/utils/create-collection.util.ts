export interface ICollection<T> {
    items?: T[];
}

export function createCollection<T>(items?: T[]): ICollection<T> {
    return {
        items,
    };
}
