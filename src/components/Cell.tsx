interface Cell {
  onClick?: () => void;
  className: string;
  children: React.ReactNode;
}

function Cell(props: Cell) {
  return (
    <div onClick={props.onClick} className={props.className}>
      {props.children}
    </div>
  );
}

export default Cell;
