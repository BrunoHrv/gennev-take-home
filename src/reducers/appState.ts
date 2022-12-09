import { Actions } from "../constants";
import { DisplayState, TestimonialAction } from "../types";

// In a larger app, I'd use redux with redux-toolkit but that seemed like overkill for this project when
// useReducer gets us the majority of the way there. The one thing that would've been nice to have is
// the redux middleware for the form update confirmation
export function testimonialReducer(
  state: DisplayState,
  { type, payload }: TestimonialAction
): DisplayState {
  const currentTestimonials = state.testimonials;
  switch (type) {
    case Actions.CREATE:
      return {
        testimonials: [...currentTestimonials, payload],
        currentTestimonialName: payload.name,
      };
    case Actions.UPDATE:
      const updateIndex = currentTestimonials.findIndex(
        (oldTestimonial) => oldTestimonial.name === payload.name
      );
      const updatedTestimonial = {
        ...currentTestimonials[updateIndex],
        ...payload,
      };
      currentTestimonials.splice(updateIndex, 1, updatedTestimonial);
      return {
        testimonials: currentTestimonials,
        currentTestimonialName: payload.name,
      };
    case Actions.DELETE:
      const deleteIndex = currentTestimonials.findIndex(
        (oldTestimonial) => oldTestimonial.name === payload.name
      );
      if (deleteIndex < 0) {
        return state;
      }
      currentTestimonials.splice(deleteIndex, 1);
      return {
        testimonials: currentTestimonials,
        currentTestimonialName: null,
      };
    default:
      return state;
  }
}
