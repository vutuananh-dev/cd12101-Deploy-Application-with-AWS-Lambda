import * as uuid from 'uuid';
import { getUploadUrl, generateAttachmentPresignedUrl } from './s3.service';
import { createLogger } from '../utils/logger';
import { TodoRepository } from '../repositories/todo.repository';
import { TodoModel } from '../models/todo.model';

const logger = createLogger('TodoService');
const todoRepository = new TodoRepository();

async function getTodosByUserId(userId) {
  logger.info(`[TodoService] - Processing get todo by user id: ${userId}`);
  return todoRepository.getTodos(userId);
}

async function createTodo(newTodo: TodoModel, userId) {
  logger.info(
    `[TodoService] - Processing create todo with data ${newTodo} by user id: ${userId}`
  );

  newTodo.todoId = uuid.v4();
  newTodo.createdAt = new Date().toISOString();
  newTodo.attachmentUrl = generateAttachmentPresignedUrl(newTodo.todoId);
  newTodo.userId = userId;
  return await todoRepository.createTodo(newTodo);
}

async function updateTodo(todoId, userId, updatedTodo) {
  logger.info(
    `[TodoService] - Processing update todo with data ${updatedTodo} by user id: ${userId} and todo id: ${todoId}`
  );
  return todoRepository.updateTodo(todoId, userId, updatedTodo);
}

async function deleteTodo(todoId: string, userId: string) {
  logger.info(
    `[TodoService] - Processing delete todo with user id: ${userId} and todo id: ${todoId}`
  );
  return todoRepository.deleteTodo(todoId, userId);
}

async function createAttachmentPresignedUrl(todoId: string) {
  logger.info(
    `[TodoService] - Processing create attachment url with todo id: ${todoId}`
  );
  return await getUploadUrl(todoId);
}

export {
  getTodosByUserId,
  createTodo,
  updateTodo,
  deleteTodo,
  createAttachmentPresignedUrl,
};
