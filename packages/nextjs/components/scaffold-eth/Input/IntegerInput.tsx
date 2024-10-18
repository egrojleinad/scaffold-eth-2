import { useCallback, useEffect, useState } from "react";
<<<<<<< HEAD
import { CommonInputProps, InputBase, IntegerVariant, isValidInteger } from "~~/components/scaffold-eth";

type IntegerInputProps = CommonInputProps<string | bigint> & {
=======
import { parseEther } from "viem";
import { CommonInputProps, InputBase, IntegerVariant, isValidInteger } from "~~/components/scaffold-eth";

type IntegerInputProps = CommonInputProps<string> & {
>>>>>>> 62c4dc973d554332264adc6cefc7f0ae48167288
  variant?: IntegerVariant;
  disableMultiplyBy1e18?: boolean;
};

export const IntegerInput = ({
  value,
  onChange,
  name,
  placeholder,
  disabled,
  variant = IntegerVariant.UINT256,
  disableMultiplyBy1e18 = false,
}: IntegerInputProps) => {
  const [inputError, setInputError] = useState(false);
  const multiplyBy1e18 = useCallback(() => {
    if (!value) {
      return;
    }
<<<<<<< HEAD
    if (typeof value === "bigint") {
      return onChange(value * 10n ** 18n);
    }
    return onChange(BigInt(Math.round(Number(value) * 10 ** 18)));
  }, [onChange, value]);

  useEffect(() => {
    if (isValidInteger(variant, value, false)) {
=======
    return onChange(parseEther(value).toString());
  }, [onChange, value]);

  useEffect(() => {
    if (isValidInteger(variant, value)) {
>>>>>>> 62c4dc973d554332264adc6cefc7f0ae48167288
      setInputError(false);
    } else {
      setInputError(true);
    }
  }, [value, variant]);

  return (
    <InputBase
      name={name}
      value={value}
      placeholder={placeholder}
      error={inputError}
      onChange={onChange}
      disabled={disabled}
      suffix={
        !inputError &&
        !disableMultiplyBy1e18 && (
          <div
            className="space-x-4 flex tooltip tooltip-top tooltip-secondary before:content-[attr(data-tip)] before:right-[-10px] before:left-auto before:transform-none"
<<<<<<< HEAD
            data-tip="Multiply by 10^18 (wei)"
=======
            data-tip="Multiply by 1e18 (wei)"
>>>>>>> 62c4dc973d554332264adc6cefc7f0ae48167288
          >
            <button
              className={`${disabled ? "cursor-not-allowed" : "cursor-pointer"} font-semibold px-4 text-accent`}
              onClick={multiplyBy1e18}
              disabled={disabled}
            >
              ∗
            </button>
          </div>
        )
      }
    />
  );
};
