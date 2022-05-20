import { Form } from '@components/Form';
import { User } from '@components/User';
import { iUser } from '@models';
import classNames from 'classnames';
import { FC, useState } from 'react';
import './UsersList.styles.scss';

interface iProps {
    data: iUser[];
    onRemove: (name: string) => void;
    onChange: (user: iUser, userIndex: number) => void;
}

const NO_SELECTED_USER = -1;

const UsersList: FC<iProps> = ({ data = [], onRemove, onChange }) => {
    const [selectedUserIndex, setSelectedUserIndex] = useState(NO_SELECTED_USER);

    const handleUpdate = (user: iUser) => {
        onChange(user, selectedUserIndex);
        setSelectedUserIndex(NO_SELECTED_USER);
    };

    const handleRemove = (name: string) => {
        setSelectedUserIndex(NO_SELECTED_USER);
        onRemove(name);
    };

    return (
        <div className={classNames('UsersList', { 'is-open': selectedUserIndex >= 0 })}>
            {selectedUserIndex < 0 && (
                <div className='UsersList__items'>
                    {data.map((user, index) => {
                        return (
                            <div
                                className='UsersList__item'
                                key={user.name}
                                style={{ height: `${100 / data.length}%` }}
                            >
                                <User data={user} onChange={() => setSelectedUserIndex(index)} />
                            </div>
                        );
                    })}
                </div>
            )}

            {selectedUserIndex >= 0 && (
                <div className='UsersList__form'>
                    <Form
                        onSubmit={handleUpdate}
                        data={data[selectedUserIndex]}
                        onRemove={handleRemove}
                    />
                    <div
                        className='App__button-add'
                        onClick={() => setSelectedUserIndex(NO_SELECTED_USER)}
                    >
                        x
                    </div>
                </div>
            )}
        </div>
    );
};

export { UsersList };
