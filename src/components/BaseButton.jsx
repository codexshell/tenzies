import PropTypes from "prop-types";

import "./BaseButton.css";

export function BaseButton({
  size = "small",
  backgroundColor,
  label,
  ...props
}) {
  return (
    <button
      type="button"
      className={[
        "c-button",
        `c-button--${size}`,
        backgroundColor === "green" && "c-button--green",
        backgroundColor === "blue" && "c-button--blue",
      ].join(" ")}
      {...props}
    >
      {label}
    </button>
  );
}

BaseButton.propTypes = {
  size: PropTypes.oneOf(["small", "large"]),
  backgroundColor: PropTypes.oneOf(["green", "blue", "white"]),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
