import { Label, TextInput } from "flowbite-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { CodeNamePair } from "../../Api";
import { appContext, AppState } from "../../Context/Context";

interface CountryItemProps {
  onClick: () => void;
  codeNamePair: CodeNamePair;
}

function CountryItem({ onClick, codeNamePair }: CountryItemProps) {
  return (
    <div
      className="rounded-md my-1 shadow-sm border min-h-[30px] "
      onClick={onClick}
    >
      <span>{codeNamePair.name}</span>
    </div>
  );
}

export function ConverterPage() {
  let {
    amount,
    selectedSource,
    selectedTarget,
    dispatch,
    getCodeNames,
    result,
    error,
  } = React.useContext(appContext) as AppState;

  const [codenames, setcodenames] = useState<CodeNamePair[]>();
  const [showSourceDrop, setShowSourceDrop] = useState(false);
  const [showTargetDrop, setShowTargetDrop] = useState(false);

  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);

  const hideDropDownCallBack = useCallback((e: MouseEvent) => {
    if (e.target !== ref1.current) {
      setShowSourceDrop(false);
    }

    if (e.target !== ref2.current) {
      setShowTargetDrop(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", hideDropDownCallBack);
    getCodeNames().then((data) => {
      setcodenames(data);
    });

    return () => {
      document.removeEventListener("click", hideDropDownCallBack);
    };
  }, []);

  const fill = (
    dropDown: boolean,
    data: string,
    onClick: (it: CodeNamePair) => void
  ) =>
    dropDown && (
      <div className="absolute bg-white text-center overflow-y-scroll w-full h-fit max-h-60 z-50 my-2 border rounded-lg shadow-lg">
        <div className="p-3 ">
          {codenames
            ?.filter(
              (it) =>
                it.code.includes(data) ||
                it.name.toLowerCase().includes(data.toLowerCase()) ||
                data === ""
            )
            .map((it, i) => (
              <CountryItem
                key={i}
                codeNamePair={it}
                onClick={() => {
                  onClick(it);
                }}
              />
            ))}
        </div>
      </div>
    );

  return (
    <div className="w-full min-h-screen flex flex-col justify-center">
      <form className="flex flex-row gap-4 justify-center my-10">
        <div className="flex flex-col gap-3 p-5 border shadow-md rounded-lg w-96">
          <div className="flex flex-row items-center justify-between gap-5">
            <Label htmlFor="source" value="From" className="w-10" />
            <div className="relative flex-auto">
              <TextInput
                className="w-full max-w-md"
                type={"text"}
                placeholder="Source Currency"
                required={true}
                onChange={(e) => {
                  const data = (e.currentTarget.value = e.currentTarget.value.toUpperCase());
                  dispatch({ event: "SETSRC", data });
                }}
                ref={ref1}
                value={selectedSource}
                onClick={() => {
                  setShowSourceDrop(true);
                }}
              />
              {fill(showSourceDrop, selectedSource, (it) => {
                dispatch({ event: "SETSRC", data: it.code });
              })}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch({ event: "CHANGE", data: 0 });
            }}
            className="self-center p-1 scale-150 border-2 rounded-full border-cyan-900"
          >
            <CgArrowsExchangeAltV className="scale-150" />
          </button>
          <div className="flex flex-row items-center justify-between gap-5">
            <Label htmlFor="source" value="To" className="w-10" />
            <div className="relative flex-auto">
              <TextInput
                className="w-full max-w-md"
                placeholder="Target Currency"
                type={"text"}
                required={true}
                ref={ref2}
                value={selectedTarget}
                onChange={(e) => {
                  dispatch({ event: "SETTRG", data: e.currentTarget.value });
                }}
                onClick={() => {
                  setShowTargetDrop(true);
                }}
              />
              {fill(showTargetDrop, selectedTarget, (it) => {
                dispatch({ event: "SETTRG", data: it.code });
              })}
            </div>
          </div>
          <div className="flex flex-row items-center gap-5 my-10">
            <Label htmlFor="source" value="Amount" className="w-10" />
            <TextInput
              className="w-full max-w-md"
              placeholder="Amount"
              type={"number"}
              required
              value={amount}
              onChange={(e) => {
                dispatch({ event: "SETAMOUNT", data: e.currentTarget.value });
              }}
            />
          </div>
          {typeof error === "undefined" ? (
            <div className="text-center overflow-clip">
              {amount === 0 ? "?" : amount}{" "}
              {selectedSource === "" ? "?" : selectedSource} ={" "}
              {result === 0 ? "?" : result}{" "}
              {selectedTarget === "" ? "?" : selectedTarget}
            </div>
          ) : (
            <div className="text-center">{error?.message}</div>
          )}
        </div>
      </form>
    </div>
  );
}
