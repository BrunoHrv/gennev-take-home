export enum Actions {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
}

export enum GridDisplayState {
  GRID = "grid",
  LIST = "list",
}

export const EMPTY_TESTIMONIAL = {
  name: "",
  age: null,
  comments: "",
  location: "",
  imageUrl: "",
};

export const MAX_FIELD_LENGTH = 1024;

export const RESET_FORM_ACTION = "reset";
export const SET_ERRORS_FORM_ACTION = "error"