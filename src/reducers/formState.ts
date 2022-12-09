import {
  EMPTY_TESTIMONIAL,
  MAX_FIELD_LENGTH,
  RESET_FORM_ACTION,
  SET_ERRORS_FORM_ACTION,
} from "../constants";
import { FormState, Testimonial } from "../types";
import { isThisAUrl } from "../utils";

interface UpdateAction {
  name: string;
  value?: string;
  testimonial?: Testimonial;
  errors?: { [key: string]: string };
}
interface UpdateFieldAction extends UpdateAction {
  value: string;
}
// By using a string literal here, typescript is smart enough to know that whenever the name matches that,
// the testimonial property will also be guaranteed to be present
interface ResetFormAction extends UpdateAction {
  name: "reset";
  testimonial: Testimonial;
}

interface ErrorFormAction extends UpdateAction {
  name: "error";
  errors: { [key: string]: string };
}

const STRING_VALIDATION_FIELDS = ["name", "location", "comments"];
const URL_VALIDATION_FIELDS = ["imageUrl"];
const POSITIVE_NUMBER_FIELDS = ["age"];

export function formReducer(
  state: FormState,
  { name, value, testimonial, errors }: UpdateFieldAction | ResetFormAction | ErrorFormAction
): FormState {
  if (name === RESET_FORM_ACTION) {
    return { testimonial, errors: {} };
  }
  if (name === SET_ERRORS_FORM_ACTION) {
    return { testimonial: state.testimonial, errors };
  }
  if (STRING_VALIDATION_FIELDS.some((field) => field === name)) {
    if (value.length > MAX_FIELD_LENGTH) {
      return {
        testimonial: { ...state.testimonial, [name]: value },
        errors: {
          ...state.errors,
          [name]: `Field exceeds ${MAX_FIELD_LENGTH} character limit`,
        },
      };
    }
  }

  if (POSITIVE_NUMBER_FIELDS.some((field) => field === name)) {
    if (+value < 0) {
      return {
        testimonial: { ...state.testimonial, [name]: value },
        errors: {
          ...state.errors,
          [name]: `Enter a non-negative age`,
        },
      };
    }
  }

  delete state.errors[name];

  return {
    testimonial: { ...state.testimonial, [name]: value },
    errors: state.errors,
  };
}

export function validateTestimonial(testimonial: Testimonial) {
  const errors = {};
  Object.keys(EMPTY_TESTIMONIAL).forEach((key) => {
    if (
      URL_VALIDATION_FIELDS.some((field) => field === key) &&
      !isThisAUrl(testimonial[key])
    ) {
      errors[key] = "Please enter a valid url";
    }
    if (
      !testimonial[key] ||
      testimonial[key] === "" ||
      testimonial[key] === null
    ) {
      errors[key] = "This field is required";
    }
  });
  return errors;
}
