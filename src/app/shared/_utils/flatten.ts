export const flatten = (arr: any[]) => {
    return arr.reduce((prev, current) =>  prev.concat(current), []);
};
