type Note = {
  title: string;
  description: string;
  tags: string[];
};

type NoteProps = {
  note: Note;
  index: number;
  openModal: (index: number, mode: ModalMode) => void;
};

type ModalProps = {
  note: Note;
  isModalOpen: boolean;
  closeModal: () => void;
  modalMode: ModalMode;
  currentNote: Note;
};

type ModalMode = 'show' | 'edit';
