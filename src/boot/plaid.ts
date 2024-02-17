import config from 'src/config';

import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const configuration = new Configuration({
  basePath: PlaidEnvironments.development,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': config.plaid.client_id,
      'PLAID-SECRET': config.plaid.client_secret,
    },
  },
});

const plaid = new PlaidApi(configuration);

export { plaid };
