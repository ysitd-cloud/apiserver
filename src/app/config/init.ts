import { ConfigService } from './config.service';

export default function init(config: ConfigService) {
  initDeployer(config);
  initAccount(config);
}

function initDeployer(config: ConfigService) {
  config.set('deployer.endpoint', process.env.DEPLOYER_ENDPOINT);
}

function initAccount(config: ConfigService) {
  config.set('account.endpoint', process.env.ACCOUNT_ENDPOINT);
}