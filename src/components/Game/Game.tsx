import { UserExtended } from '@components/UserExtended';
import { GameStatus, User } from '@models';
import { gameDetailsSelector, gameState, usersState } from '@states';
import classNames from 'classnames';
import { FC } from 'react';
import { BsArrowRepeat } from 'react-icons/bs';
import { GiAbdominalArmor, GiPointySword, GiTrophy } from 'react-icons/gi';
import { useRecoilState, useRecoilValue } from 'recoil';
import './Game.styles.scss';

const Game: FC = () => {
    const [, setGame] = useRecoilState(gameState);
    const [, setUsers] = useRecoilState(usersState);
    const { users, isComplete } = useRecoilValue(gameDetailsSelector);

    const handleResetGame = () => {
        setGame((prevState) => ({
            ...prevState,
            status: GameStatus.Setup,
        }));

        setUsers((prevState) => {
            return [...prevState.map(({ name, image }) => new User({ name, image }))];
        });
    };

    return (
        <div className='Game'>
            <div
                className={classNames('Game__repeat', { 'is-active': isComplete })}
                onClick={handleResetGame}
            >
                <BsArrowRepeat className='Game__repeat-icon' />
            </div>
            <div className='Game__items'>
                {users.map((user) => (
                    <div
                        className='Game__item'
                        key={user.name}
                        style={{ height: `${100 / users.length}%` }}
                    >
                        <UserExtended data={user} />
                    </div>
                ))}
            </div>
            <div className='Game__footer'>
                <div className='Game__cell'>
                    <GiTrophy className='Game__cell-icon' />
                </div>
                <div className='Game__cell'>
                    <GiAbdominalArmor className='Game__cell-icon' />
                </div>
                <div className='Game__cell'>
                    <GiPointySword className='Game__cell-icon' />
                </div>
            </div>
            {/* <div className={classNames('Game__reset', { 'is-active': winner })}>
                <div className='Game__reset-cancel' onClick={handleResetGame}>
                    Repeat?
                </div>
            </div> */}
        </div>
    );
};

export { Game };
