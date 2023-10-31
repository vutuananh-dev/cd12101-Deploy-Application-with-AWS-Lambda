import { HEADER_PROPS } from '../../constants/header.const';
import { deleteTodo } from '../../services/todo.service';
import { getUserId } from '../utils';

export async function handler(event) {
  const todoId = event.pathParameters.todoId;
  const currentUserId = getUserId(event);
  await deleteTodo(todoId, currentUserId as string);
  return {
    statusCode: 200,
    headers: HEADER_PROPS,
    body: null,
  };
}
