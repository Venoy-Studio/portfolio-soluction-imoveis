import React, { createContext, useContext, useState } from 'react';

export interface OpenCaptureOptions {
  buttonType?: string;
  source?: string;
  message?: string;
  propertyTitle?: string;
  propertyCode?: string;
}

interface LeadModalContextType {
  isOpen: boolean;
  options: OpenCaptureOptions;
  openCapture: (options?: OpenCaptureOptions) => void;
  closeCapture: () => void;
}

const LeadModalContext = createContext<LeadModalContextType | undefined>(undefined);

export const LeadModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<OpenCaptureOptions>({});

  const openCapture = (newOptions?: OpenCaptureOptions) => {
    setOptions(newOptions || {});
    setIsOpen(true);
  };

  const closeCapture = () => {
    setIsOpen(false);
  };

  return (
    <LeadModalContext.Provider
      value={{
        isOpen,
        options,
        openCapture,
        closeCapture,
      }}
    >
      {children}
    </LeadModalContext.Provider>
  );
};

export const useLeadModal = () => {
  const context = useContext(LeadModalContext);
  if (!context) {
    throw new Error('useLeadModal must be used within a LeadModalProvider');
  }
  return context;
};
