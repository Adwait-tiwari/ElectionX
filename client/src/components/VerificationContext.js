import React, { createContext, useState } from "react";

export const VerificationContext = createContext();

export const VerificationProvider = ({ children }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [verifiedName, setVerifiedName] = useState("");

  return (
    <VerificationContext.Provider value={{ isVerified, setIsVerified,verifiedName, setVerifiedName }}>
      {children}
    </VerificationContext.Provider>
  );
};
