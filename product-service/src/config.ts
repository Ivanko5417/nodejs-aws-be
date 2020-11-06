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
  db: {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  }
}
