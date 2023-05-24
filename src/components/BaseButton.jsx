import PropTypes from "prop-types";

import "./BaseButton.css";

export function BaseButton({
  size = "small",
  isHeld = false,
  label,
  ...props
}) {
  return (
    <button
      type="button"
      className={[
        "c-button",
        `c-button--${size}`,
        isHeld && "c-button--green",
      ].join(" ")}
      {...props}
    >
      {label}
    </button>
  );
}

BaseButton.propTypes = {
  size: PropTypes.oneOf(["small", "large"]),
  isHeld: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
