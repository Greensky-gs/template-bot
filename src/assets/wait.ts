export const wait = async(time: number) => {
    return new Promise<true>(resolve => {
        setTimeout(() => {
            resolve(true);
        }, time)
    });
};