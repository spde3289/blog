import { createContext, useState, useContext, useMemo } from "react";

interface handleType {
  input: (value: string) => void
}

interface props {
  children: JSX.Element;
}

const searchContext = createContext<[string, handleType] | null>(null);

export function SearchProvider({ children }: props) {
  const [searchValue, setSearchValue] = useState("");

  const handle = useMemo(()=>({
    input: (value: string) => setSearchValue(value),
    }),
    [setSearchValue]
  )
  
  return <searchContext.Provider children={children} value={[searchValue, handle]} />;
}

export function useSearchContext() {
  const currentContext = useContext(searchContext);

    if (!currentContext) {
    throw new Error(
      "useCurrentUser has to be used within <CurrentUserContext.Provider>"
    );
  }

  return currentContext;
}
