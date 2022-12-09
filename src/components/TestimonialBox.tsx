import * as React from "react";
import { TestimonialDispatchType } from "../types";

interface TestimonialProps {
  imgSource: string;
  comment: string;
  deleteAction: () => void | undefined;
}

interface BoxState {
  canCollapse: boolean;
  isCollapsed: boolean;
}

const MAX_HEIGHT = 170;

export default function TestimonialBox(props: TestimonialProps) {
  const [collapseState, updateCollapse] = React.useState<BoxState>({
    canCollapse: false,
    isCollapsed: true,
  });

  const heightRef = React.useRef(null);
  React.useLayoutEffect(() => {
    const boxHeight = heightRef.current.clientHeight;
    if (boxHeight > MAX_HEIGHT) {
      updateCollapse({ canCollapse: true, isCollapsed: true });
    }
  }, [props.comment]);

  return (
    <div className="testimonial">
      {props.deleteAction && (
        <div className="testimonial_delete" onClick={props.deleteAction} />
      )}
      {collapseState.canCollapse && (
        <div
          className={`testimonial_expand ${
            collapseState.isCollapsed ? "down" : "up"
          }`}
          onClick={() =>
            updateCollapse({
              ...collapseState,
              isCollapsed: !collapseState.isCollapsed,
            })
          }
        />
      )}
      <div className="testimonial_img-container">
        <img className="testimonial_img" src={props.imgSource} />
      </div>
      <div
        className={`testimonial_comment-container ${
          collapseState.isCollapsed ? "" : "expanded"
        }`}
      >
        <div className="testimonial_comment" ref={heightRef}>
          {props.comment}
        </div>
      </div>
    </div>
  );
}
