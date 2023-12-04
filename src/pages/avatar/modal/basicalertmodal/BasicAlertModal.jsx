import React from "react";
import styles from "./BasicAlertModal.module.css";

//basicAlertType은 [nickName, diconnectedServer] 두개

const BasicAlertModal = (props) => {
  const { open, close, type } = props;

  const handleAlert = () => {
    if (type == "nickName") {
      close();
    }
    if (type == "diconnectedServer") {
      window.location.reload();
    }
  };

  return (
    <div className={`${styles.openModal} ${open && styles.modal}`}>
      {open ? (
        <section>
          <main>{props.children}</main>
          <footer>
            <button className={styles.close} onClick={handleAlert}>
              확인
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default BasicAlertModal;
