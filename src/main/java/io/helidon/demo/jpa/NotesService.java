/*
 * MIT License
 *
 *  Copyright (c) 2020 PaoloB
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
package io.helidon.demo.jpa;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityExistsException;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import io.helidon.demo.jpa.exceptions.NoteExistsException;
import io.helidon.demo.jpa.exceptions.NoteNotExistsException;
import io.helidon.demo.jpa.exceptions.MalformedNoteException;

/**
 * NotesService, persistence implementation with EclipseLink JPA.
 *
 * @version 1.1 03 Jul 2020
 * @author PaoloB
 */
@ApplicationScoped
public class NotesService {

    @PersistenceContext(unitName = "note")
    private EntityManager em;

    @Transactional
    public Note publishNote(Note newNote) throws NoteExistsException, MalformedNoteException {
        try {
            return createNoteWithData(newNote.getId(), newNote.getName(), newNote.getContents());
        } catch (NoteExistsException e) {
            throw new NoteExistsException("Called method NotesService.createNoteWithData() threw an exception:" + e.getMessage());
        } catch (MalformedNoteException e) {
            throw new MalformedNoteException("Called method NotesService.createNoteWithData() threw an exception:" + e.getMessage());
        }
    }

    @Transactional
    public Note createNoteWithData(Long noteId, String noteName, String noteContents) throws NoteExistsException, MalformedNoteException {
        try {
            Note newNote = new Note();
            newNote.setId(noteId);
            newNote.setName(noteName);
            newNote.setContents(noteContents);
            em.persist(newNote);
            return newNote;
        } catch (EntityExistsException e) {
            throw new NoteExistsException("The note exists on the database. " + e.getMessage());
        } catch(IllegalArgumentException e) {
            throw new MalformedNoteException("NotesService.createNoteWithData(): Illegal argument received. " + e.getMessage());
        }
    }

    @Transactional
    public void deleteNote(Note item) throws MalformedNoteException {
        try {
            em.remove(item);
        } catch(IllegalArgumentException e) {
            throw new MalformedNoteException("NotesService.deleteNote(): Illegal argument received. " + e.getMessage());
        }
    }

    @Transactional
    public Note updateNote(Long id, Note updatedNote) {
        Note persistedNote = getNoteById(id);
        if (persistedNote == null) {
            return null;
        }
        persistedNote.setName(updatedNote.getName());
        persistedNote.setContents(updatedNote.getContents());

        return persistedNote;
    }

    @Transactional
    public void deleteNoteById(Long id) throws NoteNotExistsException, MalformedNoteException {
        Note fetched = getNoteById(id);
        if (fetched != null) {
            try {
                deleteNote(fetched);
            } catch (MalformedNoteException e) {
                throw new MalformedNoteException("Called method NotesService.deleteNote() threw an exception: " + e.getMessage());
            }
        } else {
            throw new NoteNotExistsException("Trying to delete a non-existing note ID. Refusing to do so. ID: " + id);
        }
    }

    public List<Note> getAll() throws MalformedNoteException {
        try {
            return em.createNamedQuery("Notes.AllNotes", Note.class).getResultList();
        } catch (IllegalArgumentException e) {
            throw new MalformedNoteException("NotesService.getAll(): Illegal argument received. " + e.getMessage());
        }
    }

    public Note getNoteById(Long id) {
        Note result = em.find(Note.class, id);
        if (result != null) {
            return result;
        }
        return null;
    }

}
