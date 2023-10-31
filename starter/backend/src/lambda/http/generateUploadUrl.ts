import { HEADER_PROPS } from '../../constants/header.const';
import { createAttachmentPresignedUrl } from '../../services/todo.service';

export async function handler(event) {
  const todoId = event.pathParameters.todoId;
  const uploadUrl = await createAttachmentPresignedUrl(todoId);
  return {
    statusCode: 201,
    headers: HEADER_PROPS,
    body: JSON.stringify({
      uploadUrl,
    }),
  };
}
