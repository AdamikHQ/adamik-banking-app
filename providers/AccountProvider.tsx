import React, {createContext, useState, useContext, ReactNode} from 'react';

interface AccountContextType {
  accountId: string;
  setAccountId: (id: string) => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

interface AccountProviderProps {
  children: ReactNode;
  initialAccountId?: string;
}

export const AccountProvider: React.FC<AccountProviderProps> = ({
  children,
  initialAccountId = '',
}) => {
  const [accountId, setAccountId] = useState(initialAccountId);

  console.log('Current accountId:', accountId);

  return (
    <AccountContext.Provider value={{accountId, setAccountId}}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};
