import { DynamoDB, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import * as AWSXRay from 'aws-xray-sdk-core';
import { createLogger } from '../utils/logger';

const logger = createLogger('TodoRepo');

export class TodoRepository {
  documentClient: DynamoDBClient;
  dynamoDbClient: DynamoDBDocument;
  todosTable: string | undefined;
  todosIndex: string | undefined;

  constructor() {
    this.documentClient = AWSXRay.captureAWSv3Client(new DynamoDB({}));
    this.dynamoDbClient = DynamoDBDocument.from(this.documentClient);
    this.todosTable = process.env.TODOS_TABLE;
    this.todosIndex = process.env.TODOS_CREATED_AT_INDEX;
  }

  async getTodos(userId) {
    logger.info(
      `[${TodoRepository.name}] - Processing get todo by user id: ${userId}`
    );

    const res = await this.dynamoDbClient.query({
      TableName: this.todosTable,
      IndexName: this.todosIndex,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    });

    return res.Items;
  }

  async createTodo(todoItem) {
    logger.info(
      `[${
        TodoRepository.name
      }] - Processing create todo with data ${JSON.stringify(todoItem)}`
    );
    const res = await this.dynamoDbClient.put({
      TableName: this.todosTable,
      Item: todoItem,
    });
    logger.info(`[${TodoRepository.name}] - Created todo with response ${res}`);

    return todoItem;
  }

  async updateTodo(todoId, userId, updatedTodo) {
    logger.info(
      `[${TodoRepository.name}] - Processing update todo with data ${updatedTodo} by user id: ${userId} and todo id: ${todoId}`
    );
    await this.dynamoDbClient.update({
      TableName: this.todosTable,
      Key: {
        todoId,
        userId,
      },
      UpdateExpression: 'set #name = :name, dueDate = :dueDate, done = :done',
      ExpressionAttributeValues: {
        ':name': updatedTodo.name,
        ':dueDate': updatedTodo.dueDate,
        ':done': updatedTodo.done,
      },
      ExpressionAttributeNames: {
        '#name': 'name',
      },
      ReturnValues: 'UPDATED_NEW',
    });

    return updatedTodo;
  }

  async deleteTodo(todoId, userId) {
    logger.info(
      `[${TodoRepository.name}] - Processing delete todo with user id: ${userId} and todo id: ${todoId}`
    );
    const res = await this.dynamoDbClient.delete({
      TableName: this.todosTable,
      Key: {
        todoId,
        userId,
      },
    });

    return res;
  }
}
