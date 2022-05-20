import { Gender, iUser, User } from '@models';
import { gameDetailsSelector } from '@states';
import classNames from 'classnames';
import { FC, useCallback, useEffect, useState } from 'react';
import { MdFemale, MdMale } from 'react-icons/md';
import { useRecoilValue } from 'recoil';
import './Form.styles.scss';

interface iProps {
    data?: iUser;
    onSubmit: (user: iUser) => void;
    onRemove?: (name: string) => void;
}

const Form: FC<iProps> = ({ data, onSubmit, onRemove = () => {} }) => {
    const { names } = useRecoilValue(gameDetailsSelector);
    const [name, setName] = useState('');
    const [gender, setGender] = useState(Gender.Male);
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        if (data) {
            setName(data.name);
            setGender(data.gender);
        }
    }, [data]);

    useEffect(() => {
        const isUnique = !names.filter((n) => n !== data?.name).find((n) => n === name);
        setIsValid(isUnique);
    }, [data, name, names]);

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleSubmit = useCallback(() => {
        const username = name.trim();
        if (!username || !isValid) return;

        const user = new User({ name: username, gender, image: data?.image });
        onSubmit(user);
    }, [gender, name, onSubmit, isValid, data]);

    const handleKeyDown = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
        if (key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className='Form'>
            <div className='Form__row'>
                <label className='Form__control'>
                    <div className='Form__label'>
                        Name {!isValid && <div className='Form__error'>Name already exist</div>}
                    </div>

                    <input
                        type='text'
                        className={classNames('Form__input', { 'is-error': !isValid })}
                        value={name}
                        autoFocus
                        onChange={handleChangeName}
                        onKeyDown={(e) => handleKeyDown(e)}
                        spellCheck={false}
                    />
                </label>
            </div>

            <div className='Form__row'>
                <div className='Form__label'>Gender</div>
                <div className='Form__radios'>
                    <label className='Form__radio'>
                        <input
                            className='Form__radio-input'
                            type='radio'
                            name='gender'
                            value='male'
                            checked={gender === Gender.Male}
                            onChange={() => setGender(Gender.Male)}
                        />
                        <div className='Form__radio-icon'></div>
                        <div className='Form__radio-label'>
                            <MdMale /> (male)
                        </div>
                    </label>
                    <label className='Form__radio'>
                        <input
                            className='Form__radio-input'
                            type='radio'
                            name='gender'
                            value='female'
                            checked={gender === Gender.Female}
                            onChange={() => setGender(Gender.Female)}
                        />
                        <div className='Form__radio-icon'></div>
                        <div className='Form__radio-label'>
                            <MdFemale />
                            (female)
                        </div>
                    </label>
                </div>
            </div>
            <div className='Form__row'>
                <div
                    className={classNames('Form__button', {
                        'is-full': !data,
                        'is-disabled': !isValid,
                    })}
                    onClick={handleSubmit}
                >
                    {data ? 'Save' : 'Add player'}
                </div>
                {data && (
                    <div className='Form__button is-remove' onClick={() => onRemove(data.name)}>
                        Remove
                    </div>
                )}
            </div>
        </div>
    );
};

export { Form };
