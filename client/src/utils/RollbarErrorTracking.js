import Rollbar from "rollbar";

const NODE_ENV = "%NODE_ENV%";

const ROLLBAR_CONFIG = {
  enabled: NODE_ENV === "production",
  accessToken: "%REACT_APP_ROLLBAR_ACCESS_TOKEN%",
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: { environment: NODE_ENV },
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
