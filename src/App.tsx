import { Paper, Button, TextField } from '@mui/material';
import './index.scss';
import { Note } from './components/note';
import { Modal } from './components/modal';
import { useState, useEffect } from 'react';

export const App = () => {
  const readData = async () => {
    const response = await fetch('./data.json');
    const data = await response.json();
    setNotes(data);
    setIsLoading(false);
  };

  const mockNotes = [
    {
      title: '',
      description: '',
      tags: [],
    },
  ];

  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [currentNote, setCurrentNote] = useState<Note | null>(notes[0]);
  const [activeIndex, setActiveIndex] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<ModalMode>('show');
  const [toggleFlag, setToggleFlag] = useState<boolean>(false);
  const [filterParam, setFilterParam] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    readData();
  }, []);

  const openModal = (mode: ModalMode, index?: number) => {
    if (index !== undefined) {
      setActiveIndex(index);
      setCurrentNote(notes[index]);
    }
    setModalMode(mode);
    setToggleFlag(!toggleFlag);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addTag = (noteIndex: number, tagText: string) => {
    const tempNotes = [...notes];
    tempNotes[noteIndex].tags.push(tagText);
    setNotes([...tempNotes]);
  };

  const deleteTag = (noteIndex: number, tagIndex: number) => {
    const tempNotes = [...notes];
    tempNotes[noteIndex].tags.splice(tagIndex, 1);
    setNotes([...tempNotes]);
  };

  const addNote = (note: Note) => {
    setNotes([...notes, note]);
  };

  const editNote = (note: Note, noteIndex: number) => {
    const tempNotes = [...notes];
    tempNotes[noteIndex] = {
      ...note,
      tags: tempNotes[noteIndex].tags,
    };
    setNotes([...tempNotes]);
  };

  const deleteNote = (noteIndex: number) => {
    const tempNotes = [...notes];
    tempNotes.splice(noteIndex, 1);
    setNotes([...tempNotes]);
  };

  const filterNotes = (searchParam: string) => {
    if (!searchParam) return notes;
    let tempNotes = [...notes];
    tempNotes = tempNotes.filter((tempNote) =>
      tempNote.tags.some((tag) => tag.includes(searchParam))
    );
    return tempNotes;
  };

  useEffect(() => {
    if (currentNote) {
      setIsModalOpen(true);
    }
  }, [currentNote, toggleFlag]);

  useEffect(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading data...</div>
      ) : (
        <div className="container">
          <Paper className="editor">
            <div className="editor_header">
              <h1 className="editor_title">Your notes</h1>
              <Button
                className="editor_create-btn"
                variant="outlined"
                onClick={() => openModal('addNote')}
              >
                Create a note
              </Button>
            </div>
            <TextField
              className="editor_search"
              label="Search notes by tags"
              value={filterParam}
              onChange={(e) => setFilterParam(e.target.value)}
            />
            <div className="editor_notes">
              {filterNotes(filterParam).map((note, index) => (
                <Note
                  note={note}
                  index={index}
                  key={note.title + index}
                  openModal={openModal}
                  deleteTag={deleteTag}
                  deleteNote={deleteNote}
                />
              ))}
            </div>
          </Paper>
        </div>
      )}
      {currentNote && (
        <Modal
          note={currentNote as Note}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          modalMode={modalMode}
          currentNote={currentNote}
          addTag={addTag}
          activeIndex={activeIndex as number}
          addNote={addNote}
          editNote={editNote}
        />
      )}
    </>
  );
};
