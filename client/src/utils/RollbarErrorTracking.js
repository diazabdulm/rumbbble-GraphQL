import Rollbar from "rollbar";

const ROLLBAR_CONFIG = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: { environment: process.env.NODE_ENV },
};

const rollbarInstance = new Rollbar(ROLLBAR_CONFIG);

const RollbarErrorTracking = {
  logErrorInfo: (info) => {
    rollbarInstance.info(info);
  },
  logErrorInRollbar: (error) => {
    throw new Error(error);
  },
};

Object.freeze(RollbarErrorTracking);
export default RollbarErrorTracking;
