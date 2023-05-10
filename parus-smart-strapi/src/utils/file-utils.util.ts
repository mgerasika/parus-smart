const fs = require('fs').promises;
export const fileExistsAsync = async (fileName: string): Promise<any> => {
    try {
        return await fs.stat(fileName, () => {
            return true;
        });
    } catch {
        return false;
    }
};

export const writeToFileAsync = async (fileName: string, content: string): Promise<any> => {
    try {
        (fs as any).writeFile(fileName, content).then(() => {
            return true;
        });
    } catch (error) {
        throw 'cant write ' + error;
    }
};

export const readFileAsync = async (fileName: string): Promise<any> => {
    try {
        return (await (fs.readFile as any)(fileName)) as unknown as string;
    } catch (error) {
        throw 'Cant read ' + error;
    }
};
