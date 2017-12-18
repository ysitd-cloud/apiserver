import { Controller } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { DeployerService } from './deployer.service';

@ApiUseTags('apps')
@Controller('apps')
export class DeployerController {
  constructor(private readonly service: DeployerService) {}
}
