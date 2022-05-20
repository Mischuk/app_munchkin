import { LEVELS } from '@helpers';
import { Gender, iUser } from '@models';
import { usersState } from '@states';
import _debounce from 'lodash/debounce';
import { FC, useCallback, useMemo } from 'react';
import { MdFemale, MdMale } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import './UserExtended.styles.scss';

enum InputField {
    Level = 'level',
    Bonus = 'bonus',
}

const uLevels = [...Array(LEVELS.MAX)].map((_, i) => i + 1);
const uBonuses = [...Array(31)].map((_, i) => i);

const UserExtended: FC<{ data: iUser }> = ({ data }) => {
    const [users, setUsers] = useRecoilState(usersState);
    const { name, image, gender, level, bonuses } = data;

    const userIndex = users.findIndex((u) => u.name === name);

    const updateUser = useCallback(
        (user: iUser, userIndex: number) => {
            setUsers((prevState) => {
                return [...prevState.slice(0, userIndex), user, ...prevState.slice(userIndex + 1)];
            });
        },
        [setUsers]
    );

    const handleScroll = useMemo(
        () =>
            _debounce((field: InputField, e: any) => {
                const node = e.target as HTMLDivElement;
                const isLevel = field === InputField.Level;
                const itemsCount = isLevel ? uLevels.length : uBonuses.length;
                const itemSize = node.scrollHeight / itemsCount;
                const position = node.scrollTop + (isLevel ? itemSize : 0);
                const selectedValue = Math.round(position / itemSize);

                const user = {
                    ...data,
                    level: isLevel ? selectedValue : data.level,
                    bonuses: isLevel ? data.bonuses : selectedValue,
                };

                updateUser(user, userIndex);
            }, 15),
        [data, updateUser, userIndex]
    );

    const handleChangeUserGender = () => {
        const user = {
            ...data,
            gender: data.gender === Gender.Male ? Gender.Female : Gender.Male,
        };

        updateUser(user, userIndex);
    };

    return (
        <div className='UserExtended'>
            <div className='UserExtended__info'>
                <div className='UserExtended__details'>
                    <div className='UserExtended__image' style={{ backgroundPosition: image }} />
                    <div className='UserExtended__name'>{name}</div>
                    <div className='UserExtended__gender' onClick={handleChangeUserGender}>
                        {gender === Gender.Female ? <MdFemale /> : <MdMale />}
                    </div>
                </div>
                <div className='UserExtended__points'>
                    <div className='UserExtended__point'>
                        <div
                            className='UserExtended__scrollable'
                            onScroll={(e) => handleScroll(InputField.Level, e)}
                        >
                            {uLevels.map((level) => {
                                return (
                                    <div
                                        key={`level-${level}`}
                                        className='UserExtended__scrollable-item'
                                    >
                                        {level}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className='UserExtended__point'>
                        <div
                            className='UserExtended__scrollable'
                            onScroll={(e) => handleScroll(InputField.Bonus, e)}
                        >
                            {uBonuses.map((bonus) => {
                                return (
                                    <div
                                        key={`bonuses-${bonus}`}
                                        className='UserExtended__scrollable-item'
                                    >
                                        {bonus}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className='UserExtended__point'>{Math.round(level + bonuses)}</div>
                </div>
            </div>
        </div>
    );
};

export { UserExtended };
