import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Card from "../../components/Card";
import Header from "../../components/Header";
import WinModal from "../../components/WinModal";
import { BASE_TABLE, BINGO_CARDS } from "../../constants";
import { CardElement } from "../../interfaces/Cards";
import { findElementInArray, removeItemFromArray } from "../../utils";

const Home = () => {

    const [tableCards, setTableCards] = useState<CardElement[][]>([]);
    const [showWinModal, setShowWinModal] = useState(false);
    const [ignoredIndex, setIgnoreIndex] = useState<any>({
        horizontal: [],
        vertical: [],
        diagonal: []
    });

    const handleTable = (cards: CardElement[]): CardElement[][] => {
        let table = [...BASE_TABLE];

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (i === 2 && j === 2) {
                    (table[i][j] as CardElement) = {
                        id: 999,
                        name: 'Free',
                        isSelected: true,
                        image: ''
                    };
                } else {
                    const randomIndex = Math.floor(Math.random() * cards.length);
                    table[i][j] = { ...table[i][j], ...cards[randomIndex] };
                    cards = removeItemFromArray(cards, randomIndex);
                }

            }
        }
        return table as CardElement[][];
    }

    const handleClick = (rowIndex: number, colIndex: number) => {
        let temporaryTable = [...tableCards];
        temporaryTable[rowIndex][colIndex].isSelected = true;
        setTableCards(temporaryTable);
    }

    const resetGame = () => {
        window.location.reload();
    };

    const handleHorizontalWin = (tableCards: CardElement[][]) => {
        for (let i = 0; i < 5; i++) {

            let horizontal = 0;
            if (!findElementInArray(i, ignoredIndex.horizontal)) {
                for (let j = 0; j < 5; j++) {
                    if (tableCards[i][j].isSelected) {
                        horizontal = horizontal + 1;
                    }
                }

                if (horizontal === 5) {
                    return i;
                }
            }
        }
        return;
    };

    const handleVerticalWin = (tableCards: CardElement[][]) => {
        for (let i = 0; i < 5; i++) {

            let vertical = 0;
            if (!findElementInArray(i, ignoredIndex.vertical)) {
                for (let j = 0; j < 5; j++) {
                    if (tableCards[j][i].isSelected) {
                        vertical = vertical + 1;
                    }
                }

                if (vertical === 5) {
                    return i;
                }

            }
        }

        return;
    };

    const handleDiagonalWin = (tableCards: CardElement[][]) => {
        let leftDiagonal = 0;
        let rightDiagonal = 0;
        let counterLeft = 0;
        let counterRight = 4;

        for (let i = 0; i < 5; i++) {

            if (tableCards[i][counterLeft].isSelected) {
                leftDiagonal = leftDiagonal + 1;
            }

            if (tableCards[i][counterRight].isSelected) {
                rightDiagonal = rightDiagonal + 1;
            }

            if (leftDiagonal === 5 && !findElementInArray(0, ignoredIndex.diagonal)) {
                return 0;
            } else if (rightDiagonal === 5 && !findElementInArray(4, ignoredIndex.diagonal)) {
                return 4;
            }

            counterLeft = counterLeft + 1;
            counterRight = counterRight - 1;
        }

        return;
    };

    useEffect(() => {
        setTableCards(handleTable([...BINGO_CARDS]))
    }, [])

    useEffect(() => {

        const handleWin = (tableCards: CardElement[][]) => {
            const horizontal = handleHorizontalWin(tableCards);
            const vertical = handleVerticalWin(tableCards);
            const diagonal = handleDiagonalWin(tableCards);
            let bingo = false;
            if (horizontal !== undefined) {
                setIgnoreIndex({
                    ...ignoredIndex,
                    horizontal: [...ignoredIndex.horizontal, horizontal]
                });
                bingo = true;
            }

            if (vertical !== undefined) {
                setIgnoreIndex({
                    ...ignoredIndex,
                    vertical: [...ignoredIndex.vertical, vertical]
                });
                bingo = true;
            }

            if (diagonal !== undefined) {
                setIgnoreIndex({
                    ...ignoredIndex,
                    diagonal: [...ignoredIndex.diagonal, diagonal]
                });
                bingo = true;
            }
            setShowWinModal(bingo);
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
                                row.map(({ id, name, isSelected, image }: CardElement, colIndex: number) =>
                                    <Card
                                        key={id}
                                        id={id}
                                        name={name}
                                        isSelected={isSelected}
                                        rowIndex={rowIndex}
                                        colIndex={colIndex}
                                        onClick={(rowIndex, colIndex) => handleClick(rowIndex, colIndex)}
                                        image={image}
                                    />
                                )
                            }
                        </div>
                    )
                })
            }
            <WinModal show={showWinModal} onRestart={resetGame} showModal={(show: boolean) => setShowWinModal(show)} />
        </Container>
    )
};

export default Home;