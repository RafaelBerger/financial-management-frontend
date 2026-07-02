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

  function normalizeMoneyValue(value: string) {
    const normalizedValue = value.replace(",", ".");
    const numberValue = Number(normalizedValue);

    if (value.trim() === "" || Number.isNaN(numberValue)) {
      alert("Informe um valor válido.");
      return null;
    }

    const roundedValue = Math.round(numberValue);

    if (roundedValue > 2147483647) {
      alert("O valor máximo permitido é 2.147.483.647");
      return null;
    }

    return roundedValue;
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
      return false;
    } else {
      const moneyValue = normalizeMoneyValue(inputNumber);

      if (moneyValue === null) {
        return false;
      }

      await postTasks({descricao: inputText, dinheiro: moneyValue, positivo: inputRadio === 'true', data_registro: inputDate});

      setInputDate("");
      setInputText("");
      setInputRadio("");
      setInputNumber("");

      return true;
    }
  };

  return (
    <>
      <h1 className="flex justify-center mt-4 mb-4 px-4 text-center md:mt-8">
        Informe os dados necessários para criar um card
      </h1>
      <form className="flex flex-col w-full h-auto justify-around items-center gap-4 pb-6 md:h-3/5 md:pb-0">
        <input
          type="month"
          max={`${year}-${monthFormated}`}
          className="text-black w-[90%] p-2 rounded-md sm:w-2/4"
          onChange={handleInputDate}
          required
        />
        <input
          type="text"
          placeholder="Descrição"
          className="text-black w-[90%] p-2 rounded-md sm:w-2/4"
          onChange={handleInputText}
          required
        />
        <input
          type="text"
          inputMode="decimal"
          placeholder="Valor"
          className="text-black w-[90%] p-2 rounded-md sm:w-2/4"
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
          className="w-[90%] py-2 px-10 rounded-lg bg-sky-500 hover:bg-sky-700 transition-colors sm:w-auto"
          onClick={async (e) => {
            e.preventDefault();
            const isSaved = await saveNewTask();

            if (isSaved) {
              props.fetch();
            }
          }}
        >
          Salvar
        </button>
      </form>
    </>
  );
};

export default ModalCreate;
