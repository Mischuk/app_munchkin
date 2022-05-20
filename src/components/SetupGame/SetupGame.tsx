import { Form } from '@components/Form';
import { UsersList } from '@components/UsersList';
import { getRandomPosition, USERS } from '@helpers';
import { GameStatus, iUser } from '@models';
import { gameDetailsSelector, gameState, usersState } from '@states';
import classNames from 'classnames';
import { FC, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const SetupGame: FC = () => {
    const [, setGame] = useRecoilState(gameState);
    const [users, setUsers] = useRecoilState(usersState);
    const { totalUsers } = useRecoilValue(gameDetailsSelector);
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);

    const addUser = (user: iUser) => {
        setIsAddFormOpen(false);
        setUsers((prevState) => {
            const newUser = { ...user, image: getRandomPosition(prevState) };
            return [...prevState, newUser];
        });
    };

    const removeUser = (name: string) => {
        const userIndex = users.findIndex((u) => u.name === name);
        if (userIndex < 0) return;

        setUsers((prevState) => {
            return [...prevState.slice(0, userIndex), ...prevState.slice(userIndex + 1)];
        });
    };

    const updateUser = (user: iUser, userIndex: number) => {
        setUsers((prevState) => {
            return [...prevState.slice(0, userIndex), user, ...prevState.slice(userIndex + 1)];
        });
    };

    const startGame = () => {
        if (totalUsers < USERS.MIN) return;

        setGame((prevState) => ({ ...prevState, status: GameStatus.Active }));
    };

    return (
        <>
            {!isAddFormOpen && (
                <>
                    <div className='App__wrapper'>
                        {totalUsers === 0 && <div className='App__no-data'>No players yet...</div>}
                        <div className={classNames('App__button')} onClick={startGame}>
                            GAME
                        </div>
                        {totalUsers < USERS.MAX && (
                            <div className='App__button-add' onClick={() => setIsAddFormOpen(true)}>
                                +
                            </div>
                        )}
                        <UsersList data={users} onChange={updateUser} onRemove={removeUser} />
                    </div>
                </>
            )}

            {isAddFormOpen && (
                <>
                    <div className='App__wrapper'>
                        <Form onSubmit={addUser} />
                    </div>
                    <div className='App__button-add' onClick={() => setIsAddFormOpen(false)}>
                        x
                    </div>
                </>
            )}
        </>
    );
};

export { SetupGame };
