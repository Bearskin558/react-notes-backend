import { ObjectId } from 'mongodb';
import { ApiError } from './api-error.js';

const checkAndReturnNoteId = (req) => {
  const noteId = req.params.id;
  if (!ObjectId.isValid(noteId)) {
    throw ApiError.BadRequest('Неверный id заметки');
  }
  return noteId;
};
export default checkAndReturnNoteId;
