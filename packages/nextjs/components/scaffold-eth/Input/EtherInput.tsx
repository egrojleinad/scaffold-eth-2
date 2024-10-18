<<<<<<< HEAD
import { useEffect, useMemo, useState } from "react";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { CommonInputProps, InputBase, SIGNED_NUMBER_REGEX } from "~~/components/scaffold-eth";
=======
import { useMemo, useState } from "react";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { CommonInputProps, InputBase, SIGNED_NUMBER_REGEX } from "~~/components/scaffold-eth";
import { useDisplayUsdMode } from "~~/hooks/scaffold-eth/useDisplayUsdMode";
>>>>>>> 62c4dc973d554332264adc6cefc7f0ae48167288
import { useGlobalState } from "~~/services/store/store";

const MAX_DECIMALS_USD = 2;

function etherValueToDisplayValue(usdMode: boolean, etherValue: string, nativeCurrencyPrice: number) {
  if (usdMode && nativeCurrencyPrice) {
    const parsedEthValue = parseFloat(etherValue);
    if (Number.isNaN(parsedEthValue)) {
      return etherValue;
    } else {
      // We need to round the value rather than use toFixed,
      // since otherwise a user would not be able to modify the decimal value
      return (
        Math.round(parsedEthValue * nativeCurrencyPrice * 10 ** MAX_DECIMALS_USD) /
        10 ** MAX_DECIMALS_USD
      ).toString();
    }
  } else {
    return etherValue;
  }
}

function displayValueToEtherValue(usdMode: boolean, displayValue: string, nativeCurrencyPrice: number) {
  if (usdMode && nativeCurrencyPrice) {
    const parsedDisplayValue = parseFloat(displayValue);
    if (Number.isNaN(parsedDisplayValue)) {
      // Invalid number.
      return displayValue;
    } else {
      // Compute the ETH value if a valid number.
      return (parsedDisplayValue / nativeCurrencyPrice).toString();
    }
  } else {
    return displayValue;
  }
}

/**
 * Input for ETH amount with USD conversion.
 *
 * onChange will always be called with the value in ETH
 */
export const EtherInput = ({
  value,
  name,
  placeholder,
  onChange,
  disabled,
  usdMode,
}: CommonInputProps & { usdMode?: boolean }) => {
  const [transitoryDisplayValue, setTransitoryDisplayValue] = useState<string>();
<<<<<<< HEAD
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrencyPrice);
  const [internalUsdMode, setInternalUSDMode] = useState(nativeCurrencyPrice > 0 ? Boolean(usdMode) : false);

  useEffect(() => {
    setInternalUSDMode(nativeCurrencyPrice > 0 ? Boolean(usdMode) : false);
  }, [usdMode, nativeCurrencyPrice]);
=======
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrency.price);
  const isNativeCurrencyPriceFetching = useGlobalState(state => state.nativeCurrency.isFetching);

  const { displayUsdMode, toggleDisplayUsdMode } = useDisplayUsdMode({ defaultUsdMode: usdMode });
>>>>>>> 62c4dc973d554332264adc6cefc7f0ae48167288

  // The displayValue is derived from the ether value that is controlled outside of the component
  // In usdMode, it is converted to its usd value, in regular mode it is unaltered
  const displayValue = useMemo(() => {
<<<<<<< HEAD
    const newDisplayValue = etherValueToDisplayValue(internalUsdMode, value, nativeCurrencyPrice);
=======
    const newDisplayValue = etherValueToDisplayValue(displayUsdMode, value, nativeCurrencyPrice || 0);
>>>>>>> 62c4dc973d554332264adc6cefc7f0ae48167288
    if (transitoryDisplayValue && parseFloat(newDisplayValue) === parseFloat(transitoryDisplayValue)) {
      return transitoryDisplayValue;
    }
    // Clear any transitory display values that might be set
    setTransitoryDisplayValue(undefined);
    return newDisplayValue;
<<<<<<< HEAD
  }, [nativeCurrencyPrice, transitoryDisplayValue, internalUsdMode, value]);
=======
  }, [nativeCurrencyPrice, transitoryDisplayValue, displayUsdMode, value]);
>>>>>>> 62c4dc973d554332264adc6cefc7f0ae48167288

  const handleChangeNumber = (newValue: string) => {
    if (newValue && !SIGNED_NUMBER_REGEX.test(newValue)) {
      return;
    }

    // Following condition is a fix to prevent usdMode from experiencing different display values
    // than what the user entered. This can happen due to floating point rounding errors that are introduced in the back and forth conversion
<<<<<<< HEAD
    if (internalUsdMode) {
=======
    if (displayUsdMode) {
>>>>>>> 62c4dc973d554332264adc6cefc7f0ae48167288
      const decimals = newValue.split(".")[1];
      if (decimals && decimals.length > MAX_DECIMALS_USD) {
        return;
      }
    }

    // Since the display value is a derived state (calculated from the ether value), usdMode would not allow introducing a decimal point.
    // This condition handles a transitory state for a display value with a trailing decimal sign
    if (newValue.endsWith(".") || newValue.endsWith(".0")) {
      setTransitoryDisplayValue(newValue);
    } else {
      setTransitoryDisplayValue(undefined);
    }

<<<<<<< HEAD
    const newEthValue = displayValueToEtherValue(internalUsdMode, newValue, nativeCurrencyPrice);
    onChange(newEthValue);
  };

  const toggleMode = () => {
    if (nativeCurrencyPrice > 0) {
      setInternalUSDMode(!internalUsdMode);
    }
  };

=======
    const newEthValue = displayValueToEtherValue(displayUsdMode, newValue, nativeCurrencyPrice || 0);
    onChange(newEthValue);
  };

>>>>>>> 62c4dc973d554332264adc6cefc7f0ae48167288
  return (
    <InputBase
      name={name}
      value={displayValue}
      placeholder={placeholder}
      onChange={handleChangeNumber}
      disabled={disabled}
<<<<<<< HEAD
      prefix={<span className="pl-4 -mr-2 text-accent self-center">{internalUsdMode ? "$" : "Ξ"}</span>}
=======
      prefix={<span className="pl-4 -mr-2 text-accent self-center">{displayUsdMode ? "$" : "Ξ"}</span>}
>>>>>>> 62c4dc973d554332264adc6cefc7f0ae48167288
      suffix={
        <div
          className={`${
            nativeCurrencyPrice > 0
              ? ""
              : "tooltip tooltip-secondary before:content-[attr(data-tip)] before:right-[-10px] before:left-auto before:transform-none"
          }`}
<<<<<<< HEAD
          data-tip="Unable to fetch price"
        >
          <button
            className="btn btn-primary h-[2.2rem] min-h-[2.2rem]"
            onClick={toggleMode}
            disabled={!internalUsdMode && !nativeCurrencyPrice}
=======
          data-tip={isNativeCurrencyPriceFetching ? "Fetching price" : "Unable to fetch price"}
        >
          <button
            className="btn btn-primary h-[2.2rem] min-h-[2.2rem]"
            onClick={toggleDisplayUsdMode}
            disabled={!displayUsdMode && !nativeCurrencyPrice}
>>>>>>> 62c4dc973d554332264adc6cefc7f0ae48167288
          >
            <ArrowsRightLeftIcon className="h-3 w-3 cursor-pointer" aria-hidden="true" />
          </button>
        </div>
      }
    />
  );
};
