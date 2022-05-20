import { iUser } from '@models';

const IMAGE_POSITIONS = [
    '-5px -5px',
    '-5px -50px',
    '-5px -100px',
    '-55px -5px',
    '-55px -55px',
    '-55px -100px',
    '-100px -5px',
    '-100px -50px',
    '-100px -100px',
];

export const USERS = {
    MAX: 6,
    MIN: 2,
};

export const LEVELS = {
    MIN: 1,
    MAX: 10,
};
export const getRandomPosition = (data: iUser[]) => {
    const positions = data.map((u) => u.image);
    const max = IMAGE_POSITIONS.length - 1;
    const randomIntFromInterval = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    let pos = '';
    do {
        const index = randomIntFromInterval(0, max);
        pos = IMAGE_POSITIONS[index];
        // eslint-disable-next-line no-loop-func
    } while (!!positions.find((el) => el === pos));
    return pos;
};
