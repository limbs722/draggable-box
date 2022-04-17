import { MouseEvent, useState } from 'react';

type event = MouseEvent<HTMLElement>;

function Box() {
  const [diffX, setDiffX] = useState(0);
  const [diffY, setDiffY] = useState(0);
  const [isDrag, setIsDrag] = useState(false);
  const [styles, setStyles] = useState({});

  function dragStart(e: event) {
    e.preventDefault();
    setDiffX(e.screenX - e.currentTarget.getBoundingClientRect().left);
    setDiffY(e.screenY - e.currentTarget.getBoundingClientRect().top);
    setIsDrag(true);
  }

  function dragging(e: event) {
    e.preventDefault();
    if (isDrag) {
      const container = document.getElementsByClassName(
        'draggable-container'
      )[0];
      const endOfPosX =
        container.clientWidth - e.currentTarget.getBoundingClientRect().width;
      const endOfPosY =
        container.clientHeight - e.currentTarget.getBoundingClientRect().height;
      const newDiffX = e.screenX - diffX;
      const newDiffY = e.screenY - diffY;

      const left = Math.min(Math.max(0, newDiffX), endOfPosX);
      const top = Math.min(Math.max(0, newDiffY), endOfPosY);

      setStyles({ left: left, top: top });
    }
  }

  function dragEnd() {
    setIsDrag(false);
  }

  return (
    <div
      className="box"
      onMouseDown={(e) => dragStart(e)}
      onMouseMove={(e) => dragging(e)}
      onMouseUp={dragEnd}
      onMouseLeave={dragEnd}
      style={styles}
      draggable
    >
      Box
    </div>
  );
}

export default Box;
