"use client";

<<<<<<< HEAD
import { useState } from "react";
import { Address, formatEther } from "viem";
=======
import { Address, formatEther } from "viem";
import { useDisplayUsdMode } from "~~/hooks/scaffold-eth/useDisplayUsdMode";
>>>>>>> 62c4dc973d554332264adc6cefc7f0ae48167288
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { useWatchBalance } from "~~/hooks/scaffold-eth/useWatchBalance";
import { useGlobalState } from "~~/services/store/store";

type BalanceProps = {
  address?: Address;
  className?: string;
  usdMode?: boolean;
};

/**
 * Display (ETH & USD) balance of an ETH address.
 */
export const Balance = ({ address, className = "", usdMode }: BalanceProps) => {
  const { targetNetwork } = useTargetNetwork();
<<<<<<< HEAD
  const price = useGlobalState(state => state.nativeCurrencyPrice);
=======
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrency.price);
  const isNativeCurrencyPriceFetching = useGlobalState(state => state.nativeCurrency.isFetching);

>>>>>>> 62c4dc973d554332264adc6cefc7f0ae48167288
  const {
    data: balance,
    isError,
    isLoading,
  } = useWatchBalance({
    address,
  });

<<<<<<< HEAD
  const [displayUsdMode, setDisplayUsdMode] = useState(price > 0 ? Boolean(usdMode) : false);

  const toggleBalanceMode = () => {
    if (price > 0) {
      setDisplayUsdMode(prevMode => !prevMode);
    }
  };

  if (!address || isLoading || balance === null) {
=======
  const { displayUsdMode, toggleDisplayUsdMode } = useDisplayUsdMode({ defaultUsdMode: usdMode });

  if (!address || isLoading || balance === null || (isNativeCurrencyPriceFetching && nativeCurrencyPrice === 0)) {
>>>>>>> 62c4dc973d554332264adc6cefc7f0ae48167288
    return (
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-md bg-slate-300 h-6 w-6"></div>
        <div className="flex items-center space-y-6">
          <div className="h-2 w-28 bg-slate-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`border-2 border-gray-400 rounded-md px-2 flex flex-col items-center max-w-fit cursor-pointer`}>
        <div className="text-warning">Error</div>
      </div>
    );
  }

  const formattedBalance = balance ? Number(formatEther(balance.value)) : 0;

  return (
    <button
      className={`btn btn-sm btn-ghost flex flex-col font-normal items-center hover:bg-transparent ${className}`}
<<<<<<< HEAD
      onClick={toggleBalanceMode}
=======
      onClick={toggleDisplayUsdMode}
>>>>>>> 62c4dc973d554332264adc6cefc7f0ae48167288
    >
      <div className="w-full flex items-center justify-center">
        {displayUsdMode ? (
          <>
            <span className="text-[0.8em] font-bold mr-1">$</span>
<<<<<<< HEAD
            <span>{(formattedBalance * price).toFixed(2)}</span>
=======
            <span>{(formattedBalance * nativeCurrencyPrice).toFixed(2)}</span>
>>>>>>> 62c4dc973d554332264adc6cefc7f0ae48167288
          </>
        ) : (
          <>
            <span>{formattedBalance.toFixed(4)}</span>
            <span className="text-[0.8em] font-bold ml-1">{targetNetwork.nativeCurrency.symbol}</span>
          </>
        )}
      </div>
    </button>
  );
};
