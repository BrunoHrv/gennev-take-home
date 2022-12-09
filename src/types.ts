export interface Testimonial {
  name: string;
  comments: string;
  location: string;
  age: number;
  imageUrl: string;
}

export interface DisplayState {
  testimonials: Testimonial[];
  currentTestimonialName: string | null;
}

export interface TestimonialAction {
  type: string;
  payload: Testimonial;
}

export interface ModalContextInterface {
  display?: { displayText: string; confirmAction: () => void };
}

export type TestimonialDispatchType = (testimonial: Testimonial) => void;

export interface FormState {
  testimonial: Testimonial;
  errors: { [key: string]: string };
}
