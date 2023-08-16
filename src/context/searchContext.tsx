import { createContext, useState, useContext, useMemo } from "react";

type SearchContextType = [string, {input: (value: string) => void}]

interface props {
  children: JSX.Element;
}

const SearchContext = createContext<SearchContextType>(null!);

export function SearchProvider({ children }: props) {
  const [searchValue, setSearchValue] = useState("");

  const handle = useMemo(()=>({
      input: (value: string) => setSearchValue(value),
    }),
    [setSearchValue]
  )
  
  return <SearchContext.Provider children={children} value={[searchValue, handle]} />;
}

export function useSearchContext() {
  const currentContext = useContext(SearchContext);

    if (!currentContext) {
      throw new Error(
        "useCurrentUser has to be used within <CurrentContext.Provider>"
      );
    }

  return currentContext;
}
