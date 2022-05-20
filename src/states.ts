import { LEVELS } from '@helpers';
import { atom, selector } from 'recoil';
import { GameStatus, iGame, iUser } from './models';

export const usersState = atom({
    key: 'users',
    default: [] as iUser[],
});

export const gameState = atom({
    key: 'game',
    default: {
        status: GameStatus.Setup,
    } as iGame,
});

export const gameDetailsSelector = selector({
    key: 'gameDetails',
    get: ({ get }) => {
        const users = get(usersState);
        const game = get(gameState);

        return {
            users,
            totalUsers: users.length,
            names: users.map((u) => u.name),
            gameStatus: game.status,
            isComplete: users.find(({ level }) => level === LEVELS.MAX),
        };
    },
});
