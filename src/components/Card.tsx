import { PencilSimpleLine, Trash, XCircle } from "phosphor-react";
import Modal from "react-modal";
import { useState } from "react";
import ModalUpdate from "./ModalUpdate";
import { deleteTask } from "../api/taskApi";

interface CardProps {
  id: number;
  description: string;
  value: number;
  positive: boolean;
  fetch: Function;
  identificador: number;
  dataRegistro: string;
}

const Card = (props: CardProps) => {
  const [isPositive, _setIsPositive] = useState(props.positive);

  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const taskDeleteFunc = (id: CardProps) => {
    deleteTask(id);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="Modal"
        overlayClassName="Overlay"
        ariaHideApp={false}
      >
        <div className="w-full flex justify-end">
          <XCircle
            size={36}
            color="#ffffff"
            weight="fill"
            className="cursor-pointer mr-2 mt-2"
            onClick={closeModal}
          />
        </div>
        <ModalUpdate
          id={props.id}
          descriptionCard={props.description}
          valueCard={props.value}
          positiveCard={props.positive}
          dataCard={props.dataRegistro}
          fetchUpdate={props.fetch}
          identificadorUpdate={props.identificador}
          fechaModal={closeModal}
        />
      </Modal>
      <article className="w-full flex items-center justify-between bg-pers-200 px-4 py-2 mb-3 rounded-lg">
        <div className="flex gap-4 items-center max-w-2xl">
          <b>#{props.id}</b>
          <p className="text-justify">{props.description}</p>
        </div>
        <div className="flex max-w-xs  gap-10 items-center">
          <div>
            <span
              className={`${
                isPositive === true ? "text-green-400" : "text-red-600"
              }`}
            >
              R$ {props.value}
            </span>
          </div>
          <div className="flex gap-2">
            <PencilSimpleLine
              size={32}
              color="#ffffff"
              className="cursor-pointer rounded-full"
              onClick={openModal}
            />
            <Trash
              size={32}
              color="#ffffff"
              className="cursor-pointer"
              onClick={() => {
                taskDeleteFunc(props.identificador);
                props.fetch();
              }}
            />
          </div>
        </div>
      </article>
    </>
  );
};

export default Card;
