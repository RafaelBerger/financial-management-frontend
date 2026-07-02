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

  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const taskDeleteFunc = (id: number) => {
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
      <article className="w-full flex flex-col items-stretch justify-between gap-3 bg-pers-200 px-4 py-3 mb-3 rounded-lg md:flex-row md:items-center md:gap-0 md:py-2">
        <div className="flex gap-4 items-start min-w-0 max-w-full md:items-center md:max-w-2xl">
          <b className="shrink-0">#{props.id}</b>
          <p className="text-left break-words min-w-0 md:text-justify">{props.description}</p>
        </div>
        <div className="flex w-full max-w-full justify-between gap-4 items-center md:w-auto md:max-w-xs md:gap-10">
          <div className="min-w-0">
            <span
              className={`break-words ${
                props.positive === true ? "text-green-400" : "text-red-600"
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
