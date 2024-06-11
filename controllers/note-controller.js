import { ApiError } from '../exeptions/api-error.js';
import noteService from '../services/note-service.js';
import checkAndReturnUserId from '../exeptions/checkAndReturnUserId.js';
import checkAndReturnNoteId from '../exeptions/checkAndReturnNoteId.js';

class NoteController {
  async createNote(req, res, next) {
    try {
      const userId = checkAndReturnUserId(req);
      const { type, title, content } = req.body;

      if (!title && !content) {
        return next(ApiError.BadRequest('Заполните хотя бы одно поле'));
      }

      const note = await noteService.createNote(userId, type, title, content);
      res.json(note);
    } catch (error) {
      next(error);
    }
  }

  async editNote(req, res, next) {
    try {
      const userId = checkAndReturnUserId(req);
      const noteId = checkAndReturnNoteId(req);
      const { title, content, isDeleted, isPinned, order } = req.body;
      const editedNote = await noteService.editNote(
        userId,
        noteId,
        title,
        content,
        isDeleted,
        isPinned,
        order,
      );
      res.json(editedNote);
    } catch (error) {
      next(error);
    }
  }

  async deleteNote(req, res, next) {
    try {
      const userId = checkAndReturnUserId(req);
      const noteId = checkAndReturnNoteId(req);
      const deletedNote = await noteService.deleteNote(userId, noteId);
      res.json(deletedNote);
    } catch (error) {
      next(error);
    }
  }
  async getAllNotes(req, res, next) {
    try {
      const userId = checkAndReturnUserId(req);
      const { sortBy, order } = req.query;
      if (!sortBy || !order)
        return next(ApiError.BadRequest('invalid queries'));
      const notes = await noteService.getAllNotes(userId, sortBy, order);

      res.json(notes);
    } catch (error) {
      next(error);
    }
  }
  async clearTrashNotes(req, res, next) {
    try {
      const userId = checkAndReturnUserId(req);
      const notes = await noteService.clearTrashNotes(userId);
      res.json(notes);
    } catch (error) {
      next(error);
    }
  }
}

export default new NoteController();
