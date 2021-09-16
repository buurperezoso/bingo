export interface CardProps {
    id: number;
    name: string;
    isSelected?: boolean;
    rowIndex: number;
    colIndex: number;
    onClick(rowIndex: number, colIndex: number): any
    image: string;
}

export interface CardElement {
    id: number;
    name: string;
    isSelected?: boolean;
    image: string;
}