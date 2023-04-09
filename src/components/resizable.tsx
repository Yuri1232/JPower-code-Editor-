import { on } from "events";
import { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ReizableProps {
  direction: "horizontal" | "vertical";
  children: any;
}

let resizableProps: ResizableBoxProps;

const Reizable: React.FC<ReizableProps> = ({ direction, children }) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [widths, setWidth] = useState(window.innerWidth * 0.7);
  useEffect(() => {
    let timmer: any;
    if (timmer) {
      clearTimeout(timmer);
    }
    const onResize = () => {
      timmer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.7 < widths) {
          setWidth(window.innerWidth * 0.7);
        }
      }, 100);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [widths, innerHeight, innerWidth]);

  if (direction === "horizontal") {
    resizableProps = {
      className: "horizontal",
      height: Infinity,
      width: widths,
      resizeHandles: ["e"],
      maxConstraints: [innerWidth * 0.7, Infinity],
      minConstraints: [100, Infinity],
      onResizeStop(e, data) {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      className: "vertical",
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 50],
      resizeHandles: ["s"],
      height: 300,
      width: Infinity,
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};
export default Reizable;
