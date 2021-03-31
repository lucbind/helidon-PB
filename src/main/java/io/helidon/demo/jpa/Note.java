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

import javax.persistence.Column;
import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
//import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * Note, a simple entity representation of a note with a generated Id, a name and a content.
 *
 * @version 1.1 03 Jul 2020
 * @author PaoloB
 */
@Entity(name = "Notes")
@Table(name = "NOTES")
@NamedQuery(name = "Notes.AllNotes", query = "SELECT n FROM Notes n ORDER BY n.id")
public class Note {

    @Id
    @Column(name = "ID",
            unique = true)
    // Voglio mantenere il controllo sugli ID per poter usare Oracle Jet con common model standard
    //@SequenceGenerator(name = "noteSeq", sequenceName = "NOTES_ID_SEQ", allocationSize = 1, initialValue = 1)
    //@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "noteSeq")
    private Long id;

    @Column(name = "NAME",
            unique = false)
    private String name;

    @Column(name = "CONTENTS",
            unique = false)
    private String contents;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String newName) {
        this.name = newName;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String newContent) {
        this.contents = newContent;
    }

}
