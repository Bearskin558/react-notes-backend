import { ApiError } from '../exeptions/api-error.js';
import { prisma } from '../prisma/prisma-client.js';

class NoteService {
  async createNote(userId, type, title, content) {
    const countNotes = await prisma.note.count({
      where: {
        userId,
      },
    });
    const note = prisma.note.create({
      data: {
        userId,
        type,
        title,
        content,
        order: countNotes + 1,
      },
    });
    return note;
  }

  async editNote(userId, noteId, title, content, isDeleted, isPinned, order) {
    const note = await prisma.note.findUnique({ where: { id: noteId } });
    if (!note) {
      throw ApiError.NotFound('Заметка не найдена');
    }
    if (note.userId !== userId) {
      throw new ApiError(403, 'Недостаточно прав');
    }
    const editedNote = await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        title: title || undefined,
        content: content || undefined,
        editedAt: new Date(),
        isDeleted: isDeleted,
        isPinned: isPinned,
        order,
      },
    });
    return editedNote;
  }

  async deleteNote(userId, noteId) {
    const note = await prisma.note.findUnique({
      where: {
        id: noteId,
      },
    });
    if (!note) {
      throw ApiError.NotFound('Заметка не найдена');
    }
    if (note.userId !== userId) {
      throw new ApiError(403, 'Недостаточно прав');
    }

    const deletedNote = prisma.note.delete({
      where: {
        id: noteId,
      },
    });

    return deletedNote;
  }

  async getAllNotes(userId, sortBy, order) {
    const filters = {};
    filters[sortBy] = order;
    const notes = await prisma.note.findMany({
      where: {
        userId,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });
    return notes;
  }

  async clearTrashNotes(userId) {
    const notes = await prisma.note.deleteMany({
      where: {
        userId,
        isDeleted: true,
      },
    });
    if (!notes) {
      throw ApiError.NotFound('Заметки не были найдены');
    }
    return notes;
  }
}
export default new NoteService();
