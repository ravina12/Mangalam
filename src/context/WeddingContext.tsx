import { createContext, useContext, useState } from "react";

type weddingContextType = {
    weddingDate: Date | null;
    setWeddingDate: (date: Date | null) => void;
}

const WeddingContext = createContext<weddingContextType | undefined>(undefined);

export const WeddingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [weddingDate, setWeddingDate] = useState<Date | null>(null);

    return(
        <WeddingContext.Provider value={{ weddingDate, setWeddingDate }}>
            {children}
        </WeddingContext.Provider>
    )
};

export const useWedding = () => {
    const context = useContext(WeddingContext);
    if (!context) {
        throw new Error('useWedding must be used inside WeddingProvider');
    }
    return context;
};