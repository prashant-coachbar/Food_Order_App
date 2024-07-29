import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Cart from "./Cart";
import InputForm from "./InputForm";

export default function Modal({ open,onClose }) {
    const [inCheckout, setInCheckout] = useState(false);
    const dialog = useRef();
    
    useEffect(() => {
        if (open) {
            dialog.current.showModal();
        }
        else {
            dialog.current.close();
        }
    }, [open])

    function handleOpenCheckout(){
        setInCheckout(true);
    }
    function handleRemoveCheckout() {
        setInCheckout(false);
    }
  return createPortal(
      <>
          <dialog className="modal" ref={dialog} onClose={onClose} >
              {open ? (inCheckout ? <InputForm onClose={handleRemoveCheckout} setInCheckout={ setInCheckout} />:<Cart onClose={onClose} onOpen={handleOpenCheckout}/>):null}
          </dialog>
      </>,
    document.getElementById("modal")
  );
}
