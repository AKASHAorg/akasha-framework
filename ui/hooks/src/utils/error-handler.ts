import { IAkashaError } from '@akashaorg/ui-awf-typings';
import { ILogger } from '@akashaorg/sdk-typings/lib/interfaces/log';
import getSDK from '@akashaorg/awf-sdk';

const logger = new Map<string, ILogger>();

/**
 * Utility to get a logger from a map of loggers
 * @param name - name of logger
 */
export const getLogger = (name: string) => {
  if (!logger.has(name)) {
    const sdk = getSDK();
    logger.set(name, sdk.services.log.create(name));
  }
  return logger.get(name);
};

/**
 * Utility to log error to a specified logger
 * @param name - name of logger
 * @param errorInfo - error information
 */
export const logError = (name: string, errorInfo: Error) => {
  getLogger(name).error(errorInfo.message);
};

/**
 * Utility to handle error
 * @param errorKey - key of error
 * @param critical - boolean value indicating whether error is critical or not
 * @param onError - callback to execute if error
 */
export const createErrorHandler =
  (errorKey: string, critical?: boolean, onError?: (errorObj: IAkashaError) => void) =>
  (err: Error) => {
    if (onError) {
      onError({
        errorKey,
        error: err,
        critical: critical || false,
      });
    }
  };
