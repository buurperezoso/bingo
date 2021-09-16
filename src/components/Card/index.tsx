import styles from './card.module.css';
import { CardProps } from '../../interfaces/Cards';
import { useEffect, useState } from 'react';

const Card = ({ name, rowIndex, colIndex, onClick, isSelected, image }: CardProps) => {

    const [selected, setSelected] = useState(isSelected);

    useEffect(() => {
        setSelected(isSelected);
    }, [isSelected]);

    return (
        <div
            className={styles.card}
            style={{ backgroundColor: selected ? '#969696' : 'none' }}
            onClick={() => onClick(rowIndex, colIndex)}
        >
            {
                image && <img src={`/images/${image}`} alt={name} className={styles.image} />
            }
            <span>{name}</span>
        </div>
    )
};

export default Card;