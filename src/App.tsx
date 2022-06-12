import { Paper, Button } from '@mui/material';
import './index.scss';
import { Note } from './components/note';
import { Modal } from './components/modal';
import { useState, useEffect } from 'react';

export const App = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      title: 'Макароны',
      description:
        'Купить макароны в магазине. Но это не всё. Было бы не плохо сходить в сад и набрать яблок чтобы сварить яблочный компот.',
      tags: ['макароны', 'сад', 'компот'],
    },
    {
      title: 'Рюкзак',
      description: 'Забрать рюкзак у Антона',
      tags: ['рюкзак'],
    },
  ]);
  const [currentNote, setCurrentNote] = useState<Note | null>(notes[0]);
  const [activeIndex, setActiveIndex] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<ModalMode>('show');
  const [toggleFlag, setToggleFlag] = useState<boolean>(false);

  // const data = {
  //   prop: 'value',
  // };

  // const writeData = async (data: { prop: string }) => {
  //   await fetch('./data.json', {
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //   });
  // };

  // const readData = async () => {
  //   const response = await fetch('./data.json');
  //   const data = await response.json();
  //   console.log(data);
  // };

  // <button onClick={() => readData()}>READ</button>
  // <button onClick={() => writeData(data)}>WRITE</button>

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
    console.log('edit');
    const tempNotes = [...notes];
    tempNotes[noteIndex] = {
      ...note,
      tags: tempNotes[noteIndex].tags,
    };
    setNotes([...tempNotes]);
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
          <div className="editor_notes">
            {notes.map((note, index) => (
              <Note
                note={note}
                index={index}
                key={note.title + index}
                openModal={openModal}
                deleteTag={deleteTag}
              />
            ))}
          </div>
        </Paper>
      </div>
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
