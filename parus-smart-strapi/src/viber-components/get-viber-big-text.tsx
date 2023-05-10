const { markdownToTxt } = require('markdown-to-txt');

interface IProps {
    id: string;
    title: string;
    description: string;
    link: string;
}
export const getViberBigText = ({ title, link, description }: IProps): string => {
    const titleTxt = title ? markdownToTxt(title) : title;
    const descriptionTxt = description ? markdownToTxt(description).toString() : '';
    return `${titleTxt}\n${descriptionTxt}\n${link}`;
};
