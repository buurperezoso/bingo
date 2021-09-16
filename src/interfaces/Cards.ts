export interface CardProps {
    id: string | number;
    name: string;
    isSelected: boolean;
    rowIndex: number;
    colIndex: number;
    onClick(rowIndex: number, colIndex: number): any
}

export interface CardElement {
    id: string | number;
    name: string;
}