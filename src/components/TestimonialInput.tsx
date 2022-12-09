import * as React from "react";

interface InputProps {
  name: string;
  displayName: string;
  value: string | number;
  updateFunc: ({ name, value }: { name: string; value: string }) => void;
  inputType?: string;
  error?: string;
}

export default function TestimonialInput(props: InputProps) {
  return (
    <>
      <label htmlFor={props.name}>{props.displayName}</label>
      <input
        type={props.inputType ?? "text"}
        value={props.value}
        onChange={(e) => {
          props.updateFunc({ name: props.name, value: e.target.value });
        }}
      />
      {props.error && <div className="input-error">{props.error}</div>}
    </>
  );
}
