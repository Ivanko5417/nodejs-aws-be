import { REQUIRED_ENV_VARIABLES } from './constants';

const checkVariable = (varName) => {
  if (!process.env[varName]) {
    throw new Error(`Didn't find [${varName}] env variable`);
  }
};

export const validateConfig = () => {
  REQUIRED_ENV_VARIABLES.forEach((envVariable) => {
    checkVariable(envVariable);
  })
};

export const config = {
  Ivanko5417: process.env.Ivanko5417
}
