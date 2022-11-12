type Note = {
  title: string;
  description: string;
  tags: string[];
};

type NoteProps = {
  note: Note;
  index: number;
  openModal: (mode: ModalMode, index: number) => void;
  deleteTag: (noteIndex: number, tagIndex: number) => void;
  deleteNote: (nodeIndex: number) => void;
};

type ModalProps = {
  note: Note;
  isModalOpen: boolean;
  closeModal: () => void;
  modalMode: ModalMode;
  currentNote: Note;
  addTag: (tagIndex: number, tagText: string) => void;
  activeIndex: number;
  addNote: (note: Note) => void;
  editNote: (note: Note, noteIndex: number) => void;
};

type ModalMode = 'show' | 'edit' | 'addTag' | 'addNote';
