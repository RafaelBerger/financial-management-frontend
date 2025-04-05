import { useState } from "react";
import { updateTaskApi } from "../api/taskApi";

interface modalUpdateProps {
  id: number;
  fetchUpdate: Function;
  fechaModal: Function;
  identificadorUpdate: number;

  descriptionCard: string;
  valueCard: number;
  positiveCard: boolean;
  dataCard: string;
}

const ModalUpdate = (props: modalUpdateProps) => {
  const dataDaApi = new Date(props.dataCard);
  const monthDate = dataDaApi.getMonth() + 2;
  const monthDateFormat = monthDate < 10 ? `0${monthDate}` : `${monthDate}`;
  const yearDate = dataDaApi.getFullYear();
  const dataDaApiFormatada = `${yearDate}-${monthDateFormat}`;

  const [inputText, setInputText] = useState(props.descriptionCard);
  const [inputNumber, setInputNumber] = useState(props.valueCard);
  const [inputRadio, setInputRadio] = useState(props.positiveCard);
  const [inputDate, setInputDate] = useState(dataDaApiFormatada);

  

  function handleInputText(e: any) {
    setInputText(e.target.value);
    console.log(inputText);
  }

  function handleInputNumber(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
  
    if (value > 2147483647) {
      alert("O valor máximo permitido é 2.147.483.647");
      return;
    }
  
    setInputNumber(value);
  }
  

  function handleInputRadio(e: any) {
    setInputRadio(e.target.value);
    console.log(inputRadio);
  }

  function handleInputDate(e: any) {
    setInputDate(e.target.value);
    console.log(inputDate);
  }

  //#region calculo data
  const dateCalendar = new Date();
  const getMonth = dateCalendar.getMonth() + 1;
  const monthFormated = getMonth < 10 ? `0${getMonth}` : `${getMonth}`;
  const year = dateCalendar.getFullYear();
  //#endregion

  const updateTask = async (id: number) => {
    props.fechaModal();
    if (
      inputText === "" ||
      inputNumber === 0 ||
      inputRadio == null ||
      inputDate == ""
    ) {
      return "";
    } else {
      await updateTaskApi({id, descricao: inputText, dinheiro:inputNumber, positivo:inputRadio, data:inputDate});

      setInputDate("");
      setInputText("");
      setInputRadio(false);
      setInputNumber(0);
    }
  };

  return (
    <>
      <h1 className="flex justify-center mt-8 mb-4">
        Informe os dados para atualizar o card
      </h1>
      <form className="flex flex-col w-full h-3/5 justify-around items-center gap-4">
        <input
          type="month"
          max={`${year}-${monthFormated}`}
          className="text-black w-2/4 p-2 rounded-md"
          onChange={handleInputDate}
          value={inputDate}
        />
        <input
          type="text"
          placeholder="Descrição"
          className="text-black w-2/4 p-2 rounded-md "
          onChange={handleInputText}
          value={inputText}
        />
        <input
          type="number"
          placeholder="Valor"
          className="text-black w-2/4 p-2 rounded-md"
          max={2147483647}
          onChange={handleInputNumber}
          value={inputNumber}
        />
        <div
          onChange={handleInputRadio}
          className="flex w-full justify-center gap-8"
        >
          <div className="flex flex-col gap-4">
            <input
              type="radio"
              id="ganho"
              name="receita"
              value="true"
              className="text-black scale-[2]"
              defaultChecked={inputRadio ? true : false}
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
              defaultChecked={inputRadio ? false : true}
            />
            <label htmlFor="gasto">Gasto</label>
          </div>
        </div>
        <button
          type="submit"
          className="w-auto py-2 px-10 rounded-lg bg-sky-500 hover:bg-sky-700 transition-colors"
          onClick={(e) => {
            e.preventDefault();
            updateTask(props.identificadorUpdate);

            props.fetchUpdate();
          }}
        >
          Salvar Alterações
        </button>
      </form>
    </>
  );
};

export default ModalUpdate;
