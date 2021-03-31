--
-- MIT License
--
--  Copyright (c) 2020 PaoloB
--
-- Permission is hereby granted, free of charge, to any person obtaining a copy
-- of this software and associated documentation files (the "Software"), to deal
-- in the Software without restriction, including without limitation the rights
-- to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
-- copies of the Software, and to permit persons to whom the Software is
-- furnished to do so, subject to the following conditions:
--
-- The above copyright notice and this permission notice shall be included in all
-- copies or substantial portions of the Software.
--
-- THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
-- IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
-- FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
-- AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
-- LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
-- OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
-- SOFTWARE.

-- Create table
CREATE TABLE notes (
   id NUMBER NOT NULL,
	name VARCHAR2(100),
	contents VARCHAR2(1000)
   );

-- Create sequence
CREATE SEQUENCE notes_id_seq;

-- Insert seed values used to test the application
INSERT INTO notes(id, contents, name) VALUES (999, 'i am some content', 'test note 1');
INSERT INTO notes(id, contents, name) VALUES (1000, 'yup, contents galore','test note 2');
INSERT INTO notes(id, contents, name) VALUES (1001, 'hey look here!', 'test note 3');
INSERT INTO notes(id, contents, name) VALUES (1002, 'buy some books plz','test note 4');
