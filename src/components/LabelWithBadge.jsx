import Label from "./Label";

const LabelWithBadge = ({ children, htmlFor, badge = 0 }) => {
  const renderBadge = () => {
    if (!badge) return null;
    return (
      <span className="absolute top-0 right-0 flex justify-center w-5 h-5 text-xs text-white translate-x-2 -translate-y-1 rounded-full dark:bg-dark-subtle bg-light-subtle items-cente">
        {badge}
      </span>
    );
  };
  return (
    <div className="relative">
      <Label htmlFor={htmlFor}>{children}</Label>
      {renderBadge()}
    </div>
  );
};

export default LabelWithBadge;
