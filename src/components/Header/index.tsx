import { useState } from "react";
import { CardElement } from "../../interfaces/Cards";
import { HeaderProps } from "../../interfaces/Header";
import { removeItemFromArray } from "../../utils";
import styles from './header.module.css';

const Header = ({ cards }: HeaderProps) => {
    const [bingoCards, setBingoCards] = useState<CardElement[]>([...cards]);
    const [selectedCard, setSelectedCard] = useState<CardElement>();

    const generateCard = () => {
        const randomIndex = Math.floor(Math.random() * bingoCards.length);
        setSelectedCard(bingoCards[randomIndex]);
        const newCardsArray = removeItemFromArray(bingoCards, randomIndex);
        if (newCardsArray.length > 0) {
            setBingoCards(newCardsArray);
        } else {
            setBingoCards([...cards]);
        }
    }

    return (
        <div className={styles.header}>
            <div className={styles.buttonContainer}>
                <span>Mexican Themed Bingo!</span>
                <button type="button" className='btn btn-primary' onClick={() => { generateCard() }}>Next Card!</button>
            </div>
            <div className={styles.cardSelected}>
                <span>{selectedCard?.name}</span>
            </div>

        </div>
    );
};

export default Header;