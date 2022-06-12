type Note = {
  title: string;
  description: string;
};

type NoteProps = {
  note: Note;
  index: number;
  changeCurrentNote: (index: number) => void;
};

type ModalProps = {
  note: Note;
  isModalOpen: boolean;
  closeModal: () => void;
};
