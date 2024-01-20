const Label = ({ children, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="font-semibold dark:text-dark-subtle text-light-subtle"
    >
      {children}
    </label>
  );
};

export default Label;
