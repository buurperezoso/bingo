import { CardElement } from "../interfaces/Cards";

export const removeItemFromArray = (cardsArray: CardElement[], index: number) => {
    if (index > -1) {
        cardsArray.splice(index, 1);
    }
    return cardsArray;
};

export const findElementInArray = (indexValue: number, array: number[]) => {
    return array.includes(indexValue);
}