export const PitchCard = ({ children, className = "" }) => (
  <div className={`rounded-md bg-white p-4 md:p-5 drop-shadow-xl ${className}`}>
    {children}
  </div>
);
