import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  forwardRef,
  type ReactNode,
  type MouseEvent,
} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "../components/ui/Button";
import { X } from "lucide-react";

type ModalContextValue = {
  openModal(content: ReactNode): void;
  closeModal(): void;
};

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside ModalProvider");
  return ctx;
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ReactNode>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const isOpen = Boolean(content);

  const openModal = useCallback((node: ReactNode) => {
    setContent(node);
  }, []);

  const closeModal = useCallback(() => {
    if (!closeBtnRef.current) {
      setContent(null);
      return;
    }

    gsap.to(closeBtnRef.current, {
      y: -20,
      rotate: 180,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => setContent(null),
    });
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
            <CloseButton ref={closeBtnRef} onClose={closeModal} />
            {content}
          </div>
        </dialog>
      )}
    </ModalContext.Provider>
  );
}

const CloseButton = forwardRef<HTMLButtonElement, { onClose: () => void }>(
  (props, ref) => {
    const { onClose } = props;

    useGSAP(() => {
      if (!ref || typeof ref === "function") return;

      gsap.fromTo(
        ref.current,
        { y: -20, rotate: -90, opacity: 0 },
        {
          y: 0,
          rotate: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        }
      );
    });

    return (
      <Button
        ref={ref}
        onClick={onClose}
        className="btn-circle bg-hover absolute top-2 right-2"
      >
        <X size={20} />
      </Button>
    );
  }
);

export default CloseButton;
