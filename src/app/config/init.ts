import { ConfigService } from './config.service';

export default function init(config: ConfigService) {
  initDeployer(config);
}

function initDeployer(config: ConfigService) {
  config.set('deployer.endpoint', process.env.DEPLOYER_ENDPOINT);
}