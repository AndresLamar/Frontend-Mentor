interface SquareProps {
    children: React.ReactNode;
    updateBoard: (index: number) => void;
    index: number;
}

export const Square = ({ children, updateBoard, index }: SquareProps) => {
    const handleClick = () => {
      updateBoard(index);
    };
  
    return (
      <div onClick={handleClick} className="square" key={index}>
        {children}
      </div>
    );
  };