// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api_dev:  'https://dm8906f6ae.execute-api.eu-west-1.amazonaws.com/dev',
  api_test: 'https://txcoxv32dh.execute-api.eu-west-1.amazonaws.com/test',
  api_prod: 'https://xxxxxxxxxx.execute-api.eu-west-1.amazonaws.com'
};
