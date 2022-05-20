import { Game } from '@components/Game';
import { SetupGame } from '@components/SetupGame';
import { GameStatus } from '@models';
import { gameDetailsSelector } from '@states';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import './App.styles.scss';

const App: FC = () => {
    const { gameStatus } = useRecoilValue(gameDetailsSelector);

    return (
        <div className='App'>
            {gameStatus === GameStatus.Setup && <SetupGame />}
            {gameStatus === GameStatus.Active && <Game />}
        </div>
    );
};

export { App };
