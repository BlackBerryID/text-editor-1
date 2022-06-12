import { Paper, Button } from '@mui/material';
import './index.scss';
import { Note } from './components/note';
import { Modal } from './components/modal';
import { useState, useEffect } from 'react';

export const App = () => {
  const notes = [
    {
      title: 'Макароны',
      description:
        'Купить макароны в магазине. Но это не всё. Было бы не плохо сходить в сад и набрать яблок чтобы сварить яблочный компот.',
    },
    {
      title: 'Рюкзак',
      description: 'Забрать рюкзак у Антона',
    },
  ];

  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<ModalMode>('show');

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

  const openModal = (index: number, mode: ModalMode) => {
    setModalMode(mode);
    setCurrentNote(notes[index]);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (currentNote) {
      setIsModalOpen(true);
    }
  }, [currentNote]);

  return (
    <>
      <div className="container">
        <Paper className="editor">
          <div className="editor_header">
            <h1 className="editor_title">Your notes</h1>
            <Button className="editor_create-btn" variant="outlined">
              Create a note
            </Button>
          </div>
          <div className="editor_notes">
            {notes.map((note, index) => (
              <Note note={note} index={index} key={note.title + index} openModal={openModal} />
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
        />
      )}
    </>
  );
};
