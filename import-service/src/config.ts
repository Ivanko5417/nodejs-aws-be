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
  s3: {
    bucketName: process.env.S3_BUCKET_NAME
  }
}
