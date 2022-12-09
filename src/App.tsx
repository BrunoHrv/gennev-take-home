import * as React from "react";
import TestimonialForm from "./components/TestimonialForm";
import TestimonialGrid from "./components/TestimonialGrid";
import { testimonialReducer } from "./reducers/appState";
import "./style.css";
import { DATA } from "./sample-data.js";
import { Testimonial } from "./types";
import { Actions } from "./constants";

export default function App(): JSX.Element {
  const [state, dispatch] = React.useReducer(testimonialReducer, {
    testimonials: DATA,
    currentTestimonialName: null, // this assumption only works in this backend-less environment
  });

  const createTestimonial = (testimonial: Testimonial) =>
    dispatch({ type: Actions.CREATE, payload: testimonial });
  const updateTestimonial = (testimonial: Testimonial) =>
    dispatch({ type: Actions.UPDATE, payload: testimonial });
  const deleteTestimonial = (testimonial: Testimonial) =>
    dispatch({ type: Actions.DELETE, payload: testimonial });

  return (
    <>
      <div className="title-container">
        <h1>Gennev Community Page</h1>
      </div>
      <main className="app-container">
        <TestimonialForm
          createTestimonial={createTestimonial}
          updateTestimonial={updateTestimonial}
          currentTestimonialName={state.currentTestimonialName}
        />

        <TestimonialGrid
          testimonials={state.testimonials}
          currentTestimonialName={state.currentTestimonialName}
          deleteTestimonial={deleteTestimonial}
        />
      </main>
    </>
  );
}
