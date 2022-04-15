import { MouseEvent, MutableRefObject, useState } from 'react';

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
    if (isDrag) {
      const container = document.querySelector('.draggable-container');
      const containerWidth = container?.getBoundingClientRect().width;
      const containerHeight = container?.getBoundingClientRect().height;
      const left = e.screenX - diffX;
      const top = e.screenY - diffY;

      setStyles({ left: left, top: top });
    }
    e.preventDefault();
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
      style={styles}
      draggable
    >
      Box
    </div>
  );
}

export default Box;
