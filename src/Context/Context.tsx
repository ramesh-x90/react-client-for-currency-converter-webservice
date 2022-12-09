import React, { useState, useEffect } from "react";
import Api, { CodeNamePair } from "../Api/index";

interface ContextEvents {
  event: "SETSRC" | "SETTRG" | "SETAMOUNT" | "CHANGE";
  data: any;
}

export interface AppState {
  selectedSource: string;
  selectedtarget: string;
  result: number;

  amount: number;
  error: Error | undefined;

  dispatch({ event, data }: ContextEvents): void;

  getCodeNames(): Promise<CodeNamePair[]>;
}

export const appContext = React.createContext<AppState | null>(null);

interface Props {
  children: JSX.Element[];
}

export const CurrencyConverterContextProvider = ({ children }: Props) => {
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(0);
  const [error, setError] = useState<Error | undefined>(new Error(""));

  useEffect(() => {
    updateResCall();
  }, [amount, source, target]);

  const setSrc = (code: string) => {
    setSource(code.toUpperCase());
  };

  const setTrg = (code: string) => {
    setTarget(code.toUpperCase());
  };

  const setAmnt = (num: number) => {
    if (num < 0) return;
    setAmount(num);
  };

  const flipExchangeCurrency = async () => {
    const src = source.toString();
    const trg = target.toString();
    setSrc(trg);
    setTrg(src);
  };

  const setRes = (num: number) => {
    setResult(num);
  };

  const updateResCall = async () => {
    try {
      if (source === "" || target === "") {
        setRes(0);
        return;
      }

      const res = await Api.convert(amount, source, target);
      if (typeof res === "number") {
        setError(undefined);
        setRes(res);
        return;
      }
      throw new Error("invalid response");
    } catch (e) {
      setError(new Error((e as Error).message));
    }
  };

  const defaultStte: AppState = {
    selectedSource: source,
    selectedtarget: target,
    amount,
    result,
    error,

    getCodeNames: function (): Promise<CodeNamePair[]> {
      return Api.getCodeNames();
    },
    dispatch: function ({ event, data }): void {
      if (event === "SETSRC") {
        setSrc(data);
      }
      if (event === "SETTRG") {
        setTrg(data);
      }
      if (event === "SETAMOUNT") {
        setAmnt(data);
      }
      if (event === "CHANGE") {
        flipExchangeCurrency();
      }
    },
  };

  return (
    <appContext.Provider value={defaultStte}>{children}</appContext.Provider>
  );
};
