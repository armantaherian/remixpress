import { useContext } from "react";
import type { SettingsContextProps } from "~/components/Settings/context";
import SettingsContext from "~/components/Settings/context";

function useSettings(): SettingsContextProps {
  const contextValue = useContext(SettingsContext) || {};
  if (!contextValue) {
    throw new Error(`useSettings must be used within a SettingsProvider`);
  }
  return contextValue;
}

export default useSettings;
