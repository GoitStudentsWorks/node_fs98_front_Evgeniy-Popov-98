import Modal from "../Modal/Modal.jsx"

import css from "./LogOutModal.module.css";

const LogOutModal = ({logOutModalIsOpen, closeLogOutModal}) => {
  return (
    <Modal modalIsOpen={logOutModalIsOpen} closeModal={closeLogOutModal}>
        <div className={css.box}>
            <div className={css.textBox}>
                <h3 className={css.title}>Log out</h3>
                <p  className={css.text}>Do you really want to leave?</p>
            </div>
            <div className={css.buttonBox}>
                <button className={css.btnLogOut}>Log out</button>
                <button className={css.btnCancel} onClick={()=>closeLogOutModal()}>Cancel</button>
            </div>
        </div>
    </Modal>
  )
}

export default LogOutModal