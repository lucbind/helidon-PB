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

import java.net.URI;

import java.util.List;
import java.util.logging.Logger;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.OPTIONS;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.DELETE;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;

import io.helidon.microprofile.cors.CrossOrigin;

import io.helidon.demo.jpa.exceptions.MalformedNoteException;
import io.helidon.demo.jpa.exceptions.NoteExistsException;
import io.helidon.demo.jpa.exceptions.NoteNotExistsException;

/**
 * NotesResource, REST APIs implementation.
 *
 * @version 1.2 07 Jul 2020
 * @author PaoloB
 */

@RequestScoped
@Path("/notes")
public class NotesResource {

    @Inject
    NotesService noteService;

    private static final Logger LOGGER = Logger.getLogger(NotesResource.class.getPackage().getName());

    @GET
    @Operation(summary = "Returns all notes",
               description ="This API returns all notes persisted inside the database.")
    @APIResponse(description = "JSON collection of all JSON objects representing the notes persisted in the database.",
                 content = @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = Note.class)))
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllNotes() {
        /** Get all notes - URI http://server:port/notes/ */

        List<Note> results;

        try {
            LOGGER.info("Getting all Notes from the database.");
            results = noteService.getAll();
        } catch(MalformedNoteException e) {
            return Response.status(500).build();
        }

        return Response.ok(results).status(200).build();
    }

    @GET
    @Path("/{itemId}")
    @Operation(summary = "Returns a specific note",
               description ="This API returns fron the database a specific note, identified by its id.")
    @APIResponse(description = "A JSON objects representing the requested note.",
                 content = @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = Note.class)))
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("itemId") Long itemId) {
        /** Get single note - URI http://server:port/notes/itemId */

        LOGGER.info("Getting note with id [" + itemId + "] from the database.");

        Note foundNote = noteService.getNoteById(itemId);
        if (foundNote == null) {
            LOGGER.warning("Note with id [" + itemId + "] not found in the database.");
            return Response.status(404).build();
        }

        return Response.ok(noteService.getNoteById(itemId)).status(200).build();
    }

    @POST
    //@Path("/{itemId}")
    @Operation(summary = "Persist a new note inside the database.",
               description = "This API persist a new note inside the database using the values specified in the payload.")
    @RequestBody(name = "note",
                 description = "The values representing the content of the new note.",
                 content = @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = Note.class)))
    @Consumes(MediaType.APPLICATION_JSON)
    //public Response publishNote(@PathParam("itemId") Long itemId, Note newNote) {
    public Response publishNote(Note newNote) {
            /** Create a note - URI http://server:port/notes */

        /*  Preferisco specificare anche l'id... capire poi se usarlo oppure no o usare la sequenza...
        if (newNote.getId() != null) {
            LOGGER.severe("Got a non null ID, this note is malformed.");
            return Response.status(500).build();
        }
        */

        Note inserted;

        try {
            //LOGGER.info("Creating note with id [" + itemId + "] in the database.");
            LOGGER.info("Creating note with id [" + newNote.getId() + "] in the database.");
            //newNote.setId(itemId); // controllare se serve...
            inserted = noteService.publishNote(newNote);
        } catch (NoteExistsException e) {
            /** A note with the same id is already in the database */
            LOGGER.severe("Publish failed for note with id: " + newNote.getId() + " - NOTE EXISTS.");
            return Response.status(409).build();
        } catch (MalformedNoteException e) {
            /** A malformed note cannot be written to the database */
            LOGGER.severe("Publish failed for note with id: " + newNote.getId() + " - NOTE IS MALFROMED");
            return Response.status(500).build();
        }

        URI uri = UriBuilder.fromPath("/notes/{id}").build(inserted.getId());
        return Response.created(uri).entity(inserted).build();
    }

    @PUT
    @Path("/{itemId}")
    @Operation(summary = "Update a note inside the database.",
               description = "This API updates a note inside the database using the values specified in the payload.")
    @RequestBody(name = "note",
                 description = "The values representing the content of the new note.",
                 content = @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = Note.class)))
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateNote(@PathParam("itemId") Long itemId, Note updatedNote) {
        if ((updatedNote.getName() == null) || (updatedNote.getContents() == null)) {
            LOGGER.severe("Update failed for note with id: " + itemId + " - NOTE IS MALFROMED");
            return Response.status(500).build();
        }

        Note updated = noteService.updateNote(itemId, updatedNote);
        LOGGER.info("Updated note: " + itemId);

        return Response.ok(updated.getId()).status(200).build();
    }

    @DELETE
    @Path("/{itemId}")
    @Operation(summary = "Delete a note from the database",
               description ="This API deletes a note persisted inside the database.")
    public Response deleteNote(@PathParam("itemId") Long itemId) {
        try {
            LOGGER.info("Deleting note: " + itemId);
            noteService.deleteNoteById(itemId);
        } catch(MalformedNoteException e) {
            LOGGER.severe("Delete failed for note: " + itemId + " - NOTE IS MALFROMED");
            return Response.status(500).build();
        } catch (NoteNotExistsException e) {
            LOGGER.warning("Delete failed for note: " + itemId + " - NOTE DOES NOT EXISTS.");
            return Response.status(404).build();
        }

        return Response.ok(itemId).status(200).build();
    }

    @OPTIONS
    @CrossOrigin(exposeHeaders = { "*" },
                 allowHeaders = { "*" },
                 allowMethods = { "*" },
                 allowCredentials = true,
                 value = {"*"})
    public void options() {
        /** Set headers if needed */
    }

}
