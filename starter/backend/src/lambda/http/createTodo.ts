import { HEADER_PROPS } from '../../constants/header.const';
import { createTodo } from '../../services/todo.service';
import { createLogger } from '../../utils/logger';
import { getUserId } from '../utils';
const logger = createLogger('CreateTodo');
export async function handler(event) {
  const newTodo = JSON.parse(event.body);
  const userId = getUserId(event);
  const result = await createTodo(newTodo, userId);
  logger.info(`Result - ${JSON.stringify(result)}`);
  return {
    statusCode: 201,
    headers: HEADER_PROPS,
    body: JSON.stringify({
      item: result,
    }),
  };
}
