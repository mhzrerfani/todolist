import { useOutsideClick } from '../hooks';

const Modal = ({ handleClose, show, children }) => {
  const modal = 'fixed top-0 left-0 w-full h-full bg-black bg-opacity-60';
  const showHideClassName = show ? `${modal} block` : `${modal} hidden`;

  const handleClickOutside = () => {
    handleClose();
  };

  const ref = useOutsideClick(handleClickOutside);

  return (
    <div className={showHideClassName}>
      <section
        ref={ref}
        className="fixed bg-white w-[300px] h-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col rounded-lg px-8 pb-5 pt-3"
      >
        <button className="text-xl font-bold self-end" onClick={handleClose}>
          X
        </button>
        {children}
      </section>
    </div>
  );
};

export default Modal;
