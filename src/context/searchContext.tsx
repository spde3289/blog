import { createContext, useState, useContext, useMemo } from "react";

/* interface SearchContextValue {
  [
    searchValue: string
  handle: () => ({
    input: (value: string) => React.SetStateAction<string>;
  })
  ]
}
 */
interface props {
  children: JSX.Element;
}

const searchContext = createContext<any | null>(null);

export function SearchProvider({ children }: props) {
  const [searchValue, setSearchValue] = useState("");

  const handle = useMemo(
    () => ({
      input: (value: string) => setSearchValue(value),
    }),
    [setSearchValue]
  );
  
  console.log(handle);
  return <searchContext.Provider children={children} value={[searchValue, handle]} />;
}

export function useSearchContext() {
  return useContext(searchContext);
}
