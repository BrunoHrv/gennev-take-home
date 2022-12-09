import * as React from "react";
import { GridDisplayState } from "../constants";
import { DisplayState, Testimonial, TestimonialDispatchType } from "../types";
import TestimonialBox from "./TestimonialBox";

interface GridProps extends DisplayState {
  viewState?: GridDisplayState; // potentially to be used via local storage or state to preserve display state between page navigation
  deleteTestimonial: TestimonialDispatchType;
}

export default function TestimonialGrid(props: GridProps) {
  const [isGrid, setGrid] = React.useState(true);
  return (
    <section className="display-container">
      <div className="display-header">
        <div className="display-header-button-container">
          <button
            id="grid"
            name="displayState"
            onClick={() => setGrid(true)}
            className={`display-header-button ${isGrid ? "active" : ""}`}
          >
            Grid
          </button>
          <button
            id="list"
            name="displayState"
            onClick={() => setGrid(false)}
            className={`display-header-button ${isGrid ? "" : "active"}`}
          >
            List
          </button>
        </div>
      </div>
      <div className="display-body">
        {isGrid && (
          <div className="display-grid">
            {props.testimonials.map((testimonial) => (
              <TestimonialBox
                key={testimonial.name}
                imgSource={testimonial.imageUrl}
                comment={testimonial.comments}
                deleteAction={
                  testimonial.name === props.currentTestimonialName
                    ? () => props.deleteTestimonial(testimonial)
                    : undefined
                }
              />
            ))}
          </div>
        )}

        {!isGrid && (
          <div className="display-list">
            List view coming soon!
          </div>
        )}
      </div>
    </section>
  );
}
