import { HEADER_PROPS } from '../../constants/header.const';
import { getTodosByUserId } from '../../services/todo.service';
import { getUserId } from '../utils';

export async function handler(event) {
  const userId = getUserId(event);
  const items = await getTodosByUserId(userId);
  return {
    statusCode: 200,
    headers: HEADER_PROPS,
    body: JSON.stringify({
      items,
    }),
  };
}
