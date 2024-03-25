import { SetMetadata } from '@nestjs/common';
import { Constants, Roles } from '../enums';

export const RolesGate = (...roles: Roles[]) => SetMetadata(Constants.ROLES, roles);