import { useState } from "react";
import { postTasks } from "../api/taskApi";

interface modalProps {
  fetch: Function;
}

const ModalCreate = (props: modalProps) => {
  const [inputText, setInputText] = useState("");
  const [inputNumber, setInputNumber] = useState("");
  const [inputRadio, setInputRadio] = useState("");
  const [inputDate, setInputDate] = useState("");

  function handleInputText(e: any) {
    setInputText(e.target.value);
  }

  function handleInputNumber(e: any) {
    setInputNumber(e.target.value);
  }

  function handleInputRadio(e: any) {
    setInputRadio(e.target.value);
  }

  function handleInputDate(e: any) {
    setInputDate(e.target.value);
  }
  //#region
  const dateCalendar = new Date();
  const getMonth = dateCalendar.getMonth() + 1;
  const monthFormated = getMonth < 10 ? `0${getMonth}` : `${getMonth}`;
  const year = dateCalendar.getFullYear();
  //#endregion

  const saveNewTask = async () => {
    if (
      inputText === "" ||
      inputNumber === "" ||
      inputRadio == "" ||
      inputDate == ""
    ) {
      return "";
    } else {
      await postTasks(inputText, inputNumber, inputRadio, inputDate);

      setInputDate("");
      setInputText("");
      setInputRadio("");
      setInputNumber("");
    }
  };

  return (
    <>
      <h1 className="flex justify-center mt-8 mb-4">
        Informe os dados necessários para criar um card
      </h1>
      <form className="flex flex-col w-full h-3/5 justify-around items-center gap-4">
        <input
          type="month"
          max={`${year}-${monthFormated}`}
          className="text-black w-2/4 p-2 rounded-md"
          onChange={handleInputDate}
          required
        />
        <input
          type="text"
          placeholder="Descrição"
          className="text-black w-2/4 p-2 rounded-md "
          onChange={handleInputText}
          required
        />
        <input
          type="number"
          placeholder="Valor"
          className="text-black w-2/4 p-2 rounded-md"
          onChange={handleInputNumber}
          required
        />
        <div
          className="flex w-full justify-center gap-8"
          onChange={handleInputRadio}
        >
          <div className="flex flex-col gap-4">
            <input
              type="radio"
              id="ganho"
              name="receita"
              value="true"
              className="text-black scale-[2]"
              required
            />
            <label htmlFor="ganho">Ganho</label>
          </div>
          <div className="flex flex-col gap-4">
            <input
              type="radio"
              id="gasto"
              name="receita"
              value="false"
              className="text-black scale-[2]"
              required
            />
            <label htmlFor="gasto">Gasto</label>
          </div>
        </div>
        <button
          type="submit"
          className="w-auto py-2 px-10 rounded-lg bg-sky-500 hover:bg-sky-700 transition-colors"
          onClick={(e) => {
            e.preventDefault();
            saveNewTask();
            props.fetch();
          }}
        >
          Salvar
        </button>
      </form>
    </>
  );
};

export default ModalCreate;
