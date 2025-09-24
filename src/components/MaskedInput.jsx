import * as React from "react";
import { Form } from "react-bootstrap";
import { IMaskMixin } from "react-imask";

const MaskedControl = IMaskMixin(({ inputRef, ...props }) => (
  <Form.Control {...props} ref={inputRef} />
));

const MaskedInput = React.forwardRef((props, inputRef) => {
  const { onChange, mask, ...other } = props;
  const ref = React.createRef();

  return (
    <MaskedControl
      {...other}
      inputRef={inputRef}
      ref={ref}
      mask={mask}
      onAccept={(value) => onChange({ target: { name: other.name, value } })}
    />
  );
});

export default MaskedInput;
