import { HEADER_PROPS } from '../../constants/header.const';
import { updateTodo } from '../../services/todo.service';
import { getUserId } from '../utils';

export async function handler(event) {
  const todoId = event.pathParameters.todoId;
  const updatedTodo = JSON.parse(event.body);
  const userId = getUserId(event);
  await updateTodo(todoId, userId, updatedTodo);
  return {
    statusCode: 200,
    headers: HEADER_PROPS,
    body: null,
  };
}
