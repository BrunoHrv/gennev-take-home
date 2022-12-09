import * as React from "react";
import {
  EMPTY_TESTIMONIAL,
  RESET_FORM_ACTION,
  SET_ERRORS_FORM_ACTION,
} from "../constants";
import { formReducer, validateTestimonial } from "../reducers/formState";
import { Testimonial, TestimonialDispatchType } from "../types";
import TestimonialInput from "./TestimonialInput";

interface FormProps {
  createTestimonial: TestimonialDispatchType;
  updateTestimonial: TestimonialDispatchType;
  currentTestimonialName: string | null;
}

export default function TestimonialForm(props: FormProps) {
  const [formState, updateForm] = React.useReducer(formReducer, {
    testimonial: EMPTY_TESTIMONIAL,
    errors: {},
  });
  const [confirmUpdate, setConfirmUpdate] = React.useState(false);
  return (
    <section className="form-container">
      <form className="testimonial-form">
        <h2 className="form-title">Add Your Voice</h2>
        <TestimonialInput
          displayName="Name"
          name="name"
          value={formState.testimonial.name ?? ""}
          updateFunc={updateForm}
          error={formState.errors.name}
        />
        <TestimonialInput
          displayName="Location"
          name="location"
          value={formState.testimonial.location ?? ""}
          updateFunc={updateForm}
          error={formState.errors.location}
        />
        <TestimonialInput
          displayName="Age"
          name="age"
          value={formState.testimonial.age ?? ""}
          updateFunc={updateForm}
          inputType="number"
          error={formState.errors.age}
        />
        <TestimonialInput
          displayName="Comments"
          name="comments"
          value={formState.testimonial.comments ?? ""}
          updateFunc={updateForm}
          error={formState.errors.comments}
        />
        <TestimonialInput
          displayName="Image Link"
          name="imageUrl"
          value={formState.testimonial.imageUrl ?? ""}
          updateFunc={updateForm}
          error={formState.errors.imageUrl}
        />
        {confirmUpdate && (
          <div className="form-update-warning">
            This will update your existing testimonial. Hit Submit again to
            confirm
          </div>
        )}
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            const validateErrors = validateTestimonial(formState.testimonial);
            const totalErrors = { ...validateErrors, ...formState.errors };
            if (Object.keys(totalErrors).length > 0) {
              updateForm({ name: SET_ERRORS_FORM_ACTION, errors: totalErrors });
              return;
            }
            if (
              props.currentTestimonialName === formState.testimonial.name &&
              !confirmUpdate
            ) {
              setConfirmUpdate(true);
              return;
            }
            if (
              props.currentTestimonialName &&
              formState.testimonial.name === props.currentTestimonialName
            ) {
              props.updateTestimonial(formState.testimonial);
            } else {
              props.createTestimonial(formState.testimonial);
            }

            updateForm({
              name: RESET_FORM_ACTION,
              testimonial: EMPTY_TESTIMONIAL,
            });

            setConfirmUpdate(false);
          }}
        >
          Submit
        </button>
      </form>
    </section>
  );
}
