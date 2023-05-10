import { fileExistsAsync, readFileAsync } from './file-utils.util';

export const getBackupFileContentAsync = async (): Promise<string> => {
    const backupFile = getBackupFilePath();

    if (await fileExistsAsync(backupFile)) {
        return readFileAsync(backupFile);
    }
    return '';
};

export const getBackupFilePath = (): string => {
    const dir = __dirname.split('/');
    while (dir.length && dir.includes('dist')) {
        dir.pop();
    }
    dir.push('src');
    dir.push('backup');
    const backupFile = dir.join('/') + '/all-gtable.json';
    console.log('backupFile ', backupFile);
    return backupFile;
};
