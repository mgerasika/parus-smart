export class StringBuilder {
    data: string[] = [];
    toString(): string {
        return this.data.join('');
    }

    append(str: string): void {
        this.data.push(str);
    }

    appendLine(str: string): void {
        this.data.push(str);
        this.data.push('\n');
    }
}
