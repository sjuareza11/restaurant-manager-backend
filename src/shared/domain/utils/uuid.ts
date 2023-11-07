/*
https://docs.nestjs.com/openapi/decorators#decorators
*/

import { v4 as uuidv4 } from 'uuid';

export const UUID_VERSION = 4;
export const generateUUID = () => uuidv4();
