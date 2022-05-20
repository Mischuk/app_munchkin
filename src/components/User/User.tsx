import { Gender, iUser } from '@models';
import { FC } from 'react';
import { MdFemale, MdMale } from 'react-icons/md';
import './User.styles.scss';

interface iProps {
    data: iUser;
    onChange: () => void;
}

const User: FC<iProps> = ({ data, onChange }) => {
    const { name, gender, image } = data;

    return (
        <div className='User' onClick={onChange}>
            <div className='User__image' style={{ backgroundPosition: image }}></div>
            <div className='User__info'>
                <div className='User__name'>{name}</div>
                <div className='User__gender'>
                    {gender === Gender.Female ? <MdFemale /> : <MdMale />}
                </div>
            </div>
        </div>
    );
};

export { User };
