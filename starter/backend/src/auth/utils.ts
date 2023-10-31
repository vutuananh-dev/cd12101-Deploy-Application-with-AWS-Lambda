import { decode } from 'jsonwebtoken';
import { createLogger } from '../utils/logger.js';

const logger = createLogger('utils');
export function parseUserId(jwtToken) {
  const decodedJwt = decode(jwtToken);
  logger.info(`[${parseUserId.name}] - JWT has been parsed`);
  return decodedJwt!.sub!;
}
