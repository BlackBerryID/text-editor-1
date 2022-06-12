type Note = {
  title: string;
  description: string;
  tags: string[];
};

type NoteProps = {
  note: Note;
  index: number;
  openModal: (index: number, mode: ModalMode) => void;
  deleteTag: (noteIndex: number, tagIndex: number) => void;
};

type ModalProps = {
  note: Note;
  isModalOpen: boolean;
  closeModal: () => void;
  modalMode: ModalMode;
  currentNote: Note;
  addTag: (tagIndex: number, tagText: string) => void;
  activeIndex: number;
};

type ModalMode = 'show' | 'edit' | 'addTag';
