<<<<<<< HEAD
import { ReactElement } from "react";
import { TransactionBase, TransactionReceipt, formatEther, isAddress } from "viem";
=======
import { ReactElement, useState } from "react";
import { TransactionBase, TransactionReceipt, formatEther, isAddress, isHex } from "viem";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/solid";
>>>>>>> 62c4dc973d554332264adc6cefc7f0ae48167288
import { Address } from "~~/components/scaffold-eth";
import { replacer } from "~~/utils/scaffold-eth/common";

type DisplayContent =
  | string
  | number
  | bigint
  | Record<string, any>
  | TransactionBase
  | TransactionReceipt
  | undefined
  | unknown;

<<<<<<< HEAD
export const displayTxResult = (
  displayContent: DisplayContent | DisplayContent[],
  asText = false,
=======
type ResultFontSize = "sm" | "base" | "xs" | "lg" | "xl" | "2xl" | "3xl";

export const displayTxResult = (
  displayContent: DisplayContent | DisplayContent[],
  fontSize: ResultFontSize = "base",
>>>>>>> 62c4dc973d554332264adc6cefc7f0ae48167288
): string | ReactElement | number => {
  if (displayContent == null) {
    return "";
  }

  if (typeof displayContent === "bigint") {
<<<<<<< HEAD
    try {
      const asNumber = Number(displayContent);
      if (asNumber <= Number.MAX_SAFE_INTEGER && asNumber >= Number.MIN_SAFE_INTEGER) {
        return asNumber;
      } else {
        return "Ξ" + formatEther(displayContent);
      }
    } catch (e) {
      return "Ξ" + formatEther(displayContent);
    }
  }

  if (typeof displayContent === "string" && isAddress(displayContent)) {
    return asText ? displayContent : <Address address={displayContent} />;
  }

  if (Array.isArray(displayContent)) {
    const mostReadable = (v: DisplayContent) =>
      ["number", "boolean"].includes(typeof v) ? v : displayTxResultAsText(v);
    const displayable = JSON.stringify(displayContent.map(mostReadable), replacer);

    return asText ? (
      displayable
    ) : (
      <span style={{ overflowWrap: "break-word", width: "100%" }}>{displayable.replaceAll(",", ",\n")}</span>
    );
=======
    return <NumberDisplay value={displayContent} />;
  }

  if (typeof displayContent === "string") {
    if (isAddress(displayContent)) {
      return <Address address={displayContent} size={fontSize} onlyEnsOrAddress />;
    }

    if (isHex(displayContent)) {
      return displayContent; // don't add quotes
    }
  }

  if (Array.isArray(displayContent)) {
    return <ArrayDisplay values={displayContent} size={fontSize} />;
  }

  if (typeof displayContent === "object") {
    return <StructDisplay struct={displayContent} size={fontSize} />;
>>>>>>> 62c4dc973d554332264adc6cefc7f0ae48167288
  }

  return JSON.stringify(displayContent, replacer, 2);
};

<<<<<<< HEAD
const displayTxResultAsText = (displayContent: DisplayContent) => displayTxResult(displayContent, true);
=======
const NumberDisplay = ({ value }: { value: bigint }) => {
  const [isEther, setIsEther] = useState(false);

  const asNumber = Number(value);
  if (asNumber <= Number.MAX_SAFE_INTEGER && asNumber >= Number.MIN_SAFE_INTEGER) {
    return String(value);
  }

  return (
    <div className="flex items-baseline">
      {isEther ? "Ξ" + formatEther(value) : String(value)}
      <span
        className="tooltip tooltip-secondary font-sans ml-2"
        data-tip={isEther ? "Multiply by 1e18" : "Divide by 1e18"}
      >
        <button className="btn btn-ghost btn-circle btn-xs" onClick={() => setIsEther(!isEther)}>
          <ArrowsRightLeftIcon className="h-3 w-3 opacity-65" />
        </button>
      </span>
    </div>
  );
};

export const ObjectFieldDisplay = ({
  name,
  value,
  size,
  leftPad = true,
}: {
  name: string;
  value: DisplayContent;
  size: ResultFontSize;
  leftPad?: boolean;
}) => {
  return (
    <div className={`flex flex-row items-baseline ${leftPad ? "ml-4" : ""}`}>
      <span className="text-gray-500 dark:text-gray-400 mr-2">{name}:</span>
      <span className="text-base-content">{displayTxResult(value, size)}</span>
    </div>
  );
};

const ArrayDisplay = ({ values, size }: { values: DisplayContent[]; size: ResultFontSize }) => {
  return (
    <div className="flex flex-col gap-y-1">
      {values.length ? "array" : "[]"}
      {values.map((v, i) => (
        <ObjectFieldDisplay key={i} name={`[${i}]`} value={v} size={size} />
      ))}
    </div>
  );
};

const StructDisplay = ({ struct, size }: { struct: Record<string, any>; size: ResultFontSize }) => {
  return (
    <div className="flex flex-col gap-y-1">
      struct
      {Object.entries(struct).map(([k, v]) => (
        <ObjectFieldDisplay key={k} name={k} value={v} size={size} />
      ))}
    </div>
  );
};
>>>>>>> 62c4dc973d554332264adc6cefc7f0ae48167288
