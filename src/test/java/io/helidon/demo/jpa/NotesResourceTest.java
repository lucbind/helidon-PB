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

import java.net.MalformedURLException;
import java.net.URL;

import java.util.Random;
import java.util.UUID;

import javax.enterprise.inject.se.SeContainer;
import javax.enterprise.inject.spi.CDI;

import io.helidon.microprofile.server.Server;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import io.restassured.response.Response;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

public class NotesResourceTest {

    private static Server server;

    private String getConnectionString(String path) {
        return "http://localhost:" + server.port() + path;
    }

    @BeforeAll
    public static void startTheServer() throws Exception {
        server = Server.create().start();
    }

    @Test
    void testNotesGetAllEndpoint() {
        /** Test to search for all notes */
        given()
            .when()
                .get(getConnectionString("/notes"))
            .then()
                .statusCode(200)
                .body(
                    containsString("test note 1"),
                    containsString("test note 2"),
                    containsString("test note 3"),
                    containsString("test note 4")
                );
    }

    @Test
    public void testNotesGetByIdEndpoint() {
        /** Test to search for a specific note by Id */
        Long noteId = Long.valueOf(1002);

        given().pathParam("itemId", noteId)
            .when()
                .get(getConnectionString("/notes/{itemId}"))
            .then()
                .statusCode(200)
                .body(containsString("buy some books plz"));
    }

    @Test
    public void testNotesGetANonExistingNote() {
        /** Test to search for a non existing note using a random Id */
        Random rnd = new Random();
        Long noteId = rnd.nextLong();

        given().pathParam("itemId", noteId)
            .when()
                .get(getConnectionString("/notes/{itemId}"))
            .then()
                .statusCode(404);
    }

    @Test
    public void testNotesPublishEndpoint() {
        /** Test to publish a new note using random data and then delete it */
        Integer newId = Integer.valueOf(new Random().nextInt(9999));
        String newName = UUID.randomUUID().toString();
        String newContents = UUID.randomUUID().toString();

        // Create the note...
        String requestBody = "{\"id\": \"ID_HOLDER\", \"name\": \"NAME_HOLDER\", \"contents\": \"CONTENT_HOLDER\"}";
        Response result = given()
                            .when()
                                .body(requestBody.replace("ID_HOLDER", newId.toString()).replace("NAME_HOLDER", newName).replace("CONTENT_HOLDER", newContents))
                                .contentType("application/json")
                                .post(getConnectionString("/notes"))
                            .then()
                                .statusCode(201)
                                .extract()
                                .response();

        String path = "";
        try {
            URL url = new URL(result.getHeader("Location"));
            path = url.getPath();
        } catch (MalformedURLException e) {
        }

        // ... check that the note is successfully created...
        given()
            .when()
                .get(getConnectionString(path))
            .then()
                .statusCode(200)
                .body(
                    containsString(newName),
                    containsString(newContents)
                );

        // ... then remove the note
        given()
            .when()
                .delete(getConnectionString(path))
            .then()
                .statusCode(200);

    }

    @Test
    public void testNotesUpdateEndpoint() {
        /**
         * Test to publish a new note and update it using random data and then delete it
         */
        Integer newId = Integer.valueOf(new Random().nextInt(9999));
        String newName = UUID.randomUUID().toString();
        String newContents = UUID.randomUUID().toString();

        // Create the note...
        String requestBody = "{\"id\": \"ID_HOLDER\", \"name\": \"NAME_HOLDER\", \"contents\": \"CONTENT_HOLDER\"}";
        Response result = given()
                            .when()
                                .body(requestBody.replace("ID_HOLDER", newId.toString()).replace("NAME_HOLDER", newName).replace("CONTENT_HOLDER", newContents))
                                .contentType("application/json")
                                .post(getConnectionString("/notes"))
                            .then()
                                .statusCode(201)
                                .extract()
                                .response();

        String path = "";
        try {
            URL url = new URL(result.getHeader("Location"));
            path = url.getPath();
        } catch (MalformedURLException e) {
        }

        requestBody = "{\"name\": \"NAME_HOLDER\", \"contents\": \"CONTENT_HOLDER\"}";
        String updatedName = UUID.randomUUID().toString();
        String updatedContent = UUID.randomUUID().toString();

        // ... then update the note...
        given()
            .when()
                .body(requestBody.replace("NAME_HOLDER", updatedName).replace("CONTENT_HOLDER", updatedContent))
                .contentType("application/json")
                .put(getConnectionString(path))
            .then()
                .statusCode(200);

        // ... check for the updated values are successfully written...
        given()
            .when()
                .get(getConnectionString(path))
            .then()
                .statusCode(200)
                .body(
                    containsString(updatedName),
                    containsString(updatedContent)
                );

        // ... check by getting all notes...
        given()
            .when()
                .get(getConnectionString("/notes"))
            .then()
                .statusCode(200)
                .body(
                    not(containsString(newName)),
                    not(containsString(newContents))
                );

        // ... then finally remove the note
        given()
            .when()
                .delete(getConnectionString(path))
            .then()
                .statusCode(200);
    }

    @Test
    public void testNotesDeleteANonExistingNote() {
        /** Test to delete a non existing note using a random Id */
        Random rnd = new Random();
        Long noteId = rnd.nextLong();

        given().pathParam("itemId", noteId)
            .when()
                .delete(getConnectionString("/notes/{itemId}"))
            .then()
                .statusCode(404);
    }

    @AfterAll
    static void destroyClass() {
        CDI<Object> current = CDI.current();
        ((SeContainer) current).close();
    }

}