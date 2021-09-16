import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Card from "../../components/Card";
import Header from "../../components/Header";
import WinModal from "../../components/WinModal";
import { BASE_TABLE, BINGO_CARDS } from "../../constants";
import { CardProps, CardElement } from "../../interfaces/Cards";
import { removeItemFromArray } from "../../utils";

const Home = () => {

    const [tableCards, setTableCards] = useState<CardProps[][]>([]);
    const [showWinModal, setShowWinModal] = useState(false);

    const handleTable = (cards: CardElement[]): CardProps[][] => {
        let table = [...BASE_TABLE];

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const randomIndex = Math.floor(Math.random() * cards.length);
                table[i][j] = { ...table[i][j], ...cards[randomIndex] };
                cards = removeItemFromArray(cards, randomIndex);
            }
        }

        return table as CardProps[][];
    }

    const handleClick = (rowIndex: number, colIndex: number) => {
        let temporaryTable = [...tableCards];
        temporaryTable[rowIndex][colIndex].isSelected = true;
        setTableCards(temporaryTable);
    }

    const resetGame = () => {
        window.location.reload();
    };

    const handleHorizontalWin = (tableCards: CardProps[][]) => {
        for (let i = 0; i < 5; i++) {

            let horizontal = 0;
            for (let j = 0; j < 5; j++) {
                if (tableCards[i][j].isSelected) {
                    horizontal = horizontal + 1;
                }
            }

            if (horizontal === 5) {
                return true;
            }
        }
    };

    const handleVerticalWin = (tableCards: CardProps[][]) => {
        for (let i = 0; i < 5; i++) {
            let vertical = 0;
            for (let j = 0; j < 5; j++) {
                if (tableCards[j][i].isSelected) {
                    vertical = vertical + 1;
                }
            }

            if (vertical === 5) {
                return true;
            }
        }
    };

    useEffect(() => {
        setTableCards(handleTable([...BINGO_CARDS]))
    }, [])

    useEffect(() => {

        const handleWin = (tableCards: CardProps[][]) => {
            const horizontal = handleHorizontalWin(tableCards);
            const vertical = handleVerticalWin(tableCards);

            if (horizontal) {
                setShowWinModal(true);
            } else if (vertical) {
                setShowWinModal(true);
            }

        }

        if (tableCards.length > 0) {
            handleWin(tableCards)
        }
    }, [tableCards]);

    return (
        <Container>
            <Header cards={[...BINGO_CARDS]} />
            {
                tableCards.map((row, rowIndex) => {
                    return (
                        <div style={{ display: 'flex' }} key={rowIndex}>
                            {
                                row.map(({ id, name, isSelected }: CardProps, colIndex: number) =>
                                    <Card
                                        key={id}
                                        id={id}
                                        name={name}
                                        isSelected={isSelected}
                                        rowIndex={rowIndex}
                                        colIndex={colIndex}
                                        onClick={(rowIndex, colIndex) => handleClick(rowIndex, colIndex)}
                                    />
                                )
                            }
                        </div>
                    )
                })
            }
            <WinModal show={showWinModal} onRestart={resetGame} />
        </Container>
    )
};

export default Home;