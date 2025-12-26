import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import Button from "../components/ui/Button";
type ModalContextValue = {
  openModal(content: ReactNode): void;
  closeModal(): void;
};

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function useModal(): ModalContextValue {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("Use Modal must be used inside Modal Provider");
  }

  return context;
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ReactNode>(null);
  const isOpen = Boolean(content);

  const openModal = useCallback(function openModal(content: ReactNode) {
    setContent(content);
  }, []);

  const closeModal = useCallback(function closeModal() {
    setContent(null);
  }, []);

  function handleBackdropClick(e: MouseEvent<HTMLDialogElement>) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {isOpen && (
        <dialog open className="modal modal-open" onClick={handleBackdropClick}>
          <div className="modal-box relative">
            <CloseButton onClose={closeModal} />
            {content}
          </div>
        </dialog>
      )}
    </ModalContext.Provider>
  );
}

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    // <button
    //   type="button"
    //   aria-label="Close modal"
    //   className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
    //   onClick={onClose}
    // >
    //   ✕
    // </button>

    <Button 
    onClick={onClose} 
    
    >
        ✕
    </Button>

  );
}
