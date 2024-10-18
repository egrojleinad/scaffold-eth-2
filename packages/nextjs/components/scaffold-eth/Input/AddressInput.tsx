<<<<<<< HEAD
import { useCallback, useEffect, useState } from "react";
=======
import { useEffect, useState } from "react";
>>>>>>> 62c4dc973d554332264adc6cefc7f0ae48167288
import { blo } from "blo";
import { useDebounceValue } from "usehooks-ts";
import { Address, isAddress } from "viem";
import { normalize } from "viem/ens";
import { useEnsAddress, useEnsAvatar, useEnsName } from "wagmi";
import { CommonInputProps, InputBase, isENS } from "~~/components/scaffold-eth";

/**
 * Address input with ENS name resolution
 */
export const AddressInput = ({ value, name, placeholder, onChange, disabled }: CommonInputProps<Address | string>) => {
  // Debounce the input to keep clean RPC calls when resolving ENS names
  // If the input is an address, we don't need to debounce it
  const [_debouncedValue] = useDebounceValue(value, 500);
  const debouncedValue = isAddress(value) ? value : _debouncedValue;
  const isDebouncedValueLive = debouncedValue === value;

  // If the user changes the input after an ENS name is already resolved, we want to remove the stale result
  const settledValue = isDebouncedValueLive ? debouncedValue : undefined;

  const {
    data: ensAddress,
    isLoading: isEnsAddressLoading,
    isError: isEnsAddressError,
    isSuccess: isEnsAddressSuccess,
  } = useEnsAddress({
    name: settledValue,
    chainId: 1,
    query: {
      gcTime: 30_000,
      enabled: isDebouncedValueLive && isENS(debouncedValue),
    },
  });

  const [enteredEnsName, setEnteredEnsName] = useState<string>();
  const {
    data: ensName,
    isLoading: isEnsNameLoading,
    isError: isEnsNameError,
    isSuccess: isEnsNameSuccess,
  } = useEnsName({
    address: settledValue as Address,
    chainId: 1,
    query: {
      enabled: isAddress(debouncedValue),
      gcTime: 30_000,
    },
  });

<<<<<<< HEAD
  const { data: ensAvatar, isLoading: isEnsAvtarLoading } = useEnsAvatar({
=======
  const { data: ensAvatar, isLoading: isEnsAvatarLoading } = useEnsAvatar({
>>>>>>> 62c4dc973d554332264adc6cefc7f0ae48167288
    name: ensName ? normalize(ensName) : undefined,
    chainId: 1,
    query: {
      enabled: Boolean(ensName),
      gcTime: 30_000,
    },
  });

  // ens => address
  useEffect(() => {
    if (!ensAddress) return;

    // ENS resolved successfully
    setEnteredEnsName(debouncedValue);
    onChange(ensAddress);
  }, [ensAddress, onChange, debouncedValue]);

<<<<<<< HEAD
  const handleChange = useCallback(
    (newValue: Address) => {
      setEnteredEnsName(undefined);
      onChange(newValue);
    },
    [onChange],
  );
=======
  useEffect(() => {
    setEnteredEnsName(undefined);
  }, [value]);
>>>>>>> 62c4dc973d554332264adc6cefc7f0ae48167288

  const reFocus =
    isEnsAddressError ||
    isEnsNameError ||
    isEnsNameSuccess ||
    isEnsAddressSuccess ||
    ensName === null ||
    ensAddress === null;

  return (
    <InputBase<Address>
      name={name}
      placeholder={placeholder}
      error={ensAddress === null}
      value={value as Address}
<<<<<<< HEAD
      onChange={handleChange}
=======
      onChange={onChange}
>>>>>>> 62c4dc973d554332264adc6cefc7f0ae48167288
      disabled={isEnsAddressLoading || isEnsNameLoading || disabled}
      reFocus={reFocus}
      prefix={
        ensName ? (
          <div className="flex bg-base-300 rounded-l-full items-center">
<<<<<<< HEAD
            {isEnsAvtarLoading && <div className="skeleton bg-base-200 w-[35px] h-[35px] rounded-full shrink-0"></div>}
=======
            {isEnsAvatarLoading && <div className="skeleton bg-base-200 w-[35px] h-[35px] rounded-full shrink-0"></div>}
>>>>>>> 62c4dc973d554332264adc6cefc7f0ae48167288
            {ensAvatar ? (
              <span className="w-[35px]">
                {
                  // eslint-disable-next-line
                  <img className="w-full rounded-full" src={ensAvatar} alt={`${ensAddress} avatar`} />
                }
              </span>
            ) : null}
            <span className="text-accent px-2">{enteredEnsName ?? ensName}</span>
          </div>
        ) : (
          (isEnsNameLoading || isEnsAddressLoading) && (
            <div className="flex bg-base-300 rounded-l-full items-center gap-2 pr-2">
              <div className="skeleton bg-base-200 w-[35px] h-[35px] rounded-full shrink-0"></div>
              <div className="skeleton bg-base-200 h-3 w-20"></div>
            </div>
          )
        )
      }
      suffix={
        // Don't want to use nextJS Image here (and adding remote patterns for the URL)
        // eslint-disable-next-line @next/next/no-img-element
        value && <img alt="" className="!rounded-full" src={blo(value as `0x${string}`)} width="35" height="35" />
      }
    />
  );
};
