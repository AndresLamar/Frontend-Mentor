
interface SquareProps {
    children: React.ReactNode;
    updateBoard: (index: number) => void;
    index: number;
    className?: string;
}

export const Square = ({ children, updateBoard, index, className }: SquareProps) => {
  
    const handleClick = () => {
      updateBoard(index);
    };
  
    return (
      <div onClick={handleClick} className={`square ${className}`} key={index}>
        {children}
      </div>
    );
  };