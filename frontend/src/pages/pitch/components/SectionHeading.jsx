export const SectionHeading = ({ children }) => (
  <h4 className="text-xl font-semibold relative w-max mb-4">
    {children}
    <div className="absolute w-1/2 bg-primary -bottom-1 left-0 h-0.5" />
  </h4>
);
