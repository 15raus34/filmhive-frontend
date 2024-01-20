const ViewAllBtn = ({ children, visible, onClick }) => {
  if (!visible) return null;
  return (
    <button
      type="button"
      onClick={onClick}
      className="transition dark:text-white text-primary hover:underline"
    >
      {children}
    </button>
  );
};

export default ViewAllBtn;
