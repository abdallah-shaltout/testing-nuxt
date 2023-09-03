export const text_slice = (str: string, len: number = 10) => {
    return str?.length <= len ? str : `${str?.slice(0, len)}...`;
};
