<<<<<<< HEAD
import { BaseError as BaseViemError, DecodeErrorResultReturnType } from "viem";
=======
import { BaseError as BaseViemError, ContractFunctionRevertedError } from "viem";
>>>>>>> 62c4dc973d554332264adc6cefc7f0ae48167288

/**
 * Parses an viem/wagmi error to get a displayable string
 * @param e - error object
 * @returns parsed error string
 */
<<<<<<< HEAD
export const getParsedError = (e: any): string => {
  let message: string = e.message ?? "An unknown error occurred";
  if (e instanceof BaseViemError) {
    if (e.details) {
      message = e.details;
    } else if (e.shortMessage) {
      message = e.shortMessage;
      const cause = e.cause as { data?: DecodeErrorResultReturnType } | undefined;
      // if its not generic error, append custom error name and its args to message
      if (cause?.data && cause.data?.errorName !== "Error") {
        const customErrorArgs = cause.data.args?.toString() ?? "";
        message = `${message.replace(/reverted\.$/, "reverted with following reason:")}\n${
          cause.data.errorName
        }(${customErrorArgs})`;
      }
    } else if (e.message) {
      message = e.message;
    } else if (e.name) {
      message = e.name;
    }
  }

  return message;
=======
export const getParsedError = (error: any): string => {
  const parsedError = error?.walk ? error.walk() : error;

  if (parsedError instanceof BaseViemError) {
    if (parsedError.details) {
      return parsedError.details;
    }

    if (parsedError.shortMessage) {
      if (
        parsedError instanceof ContractFunctionRevertedError &&
        parsedError.data &&
        parsedError.data.errorName !== "Error"
      ) {
        const customErrorArgs = parsedError.data.args?.toString() ?? "";
        return `${parsedError.shortMessage.replace(/reverted\.$/, "reverted with the following reason:")}\n${
          parsedError.data.errorName
        }(${customErrorArgs})`;
      }

      return parsedError.shortMessage;
    }

    return parsedError.message ?? parsedError.name ?? "An unknown error occurred";
  }

  return parsedError?.message ?? "An unknown error occurred";
>>>>>>> 62c4dc973d554332264adc6cefc7f0ae48167288
};
