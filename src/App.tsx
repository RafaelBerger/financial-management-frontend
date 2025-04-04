import Card from "./components/Card";
import ModalCreation from "./components/ModalCreate";
import { PlusCircle, XCircle } from "phosphor-react";
import { useState, useEffect } from "react";
import { getMonthTasks } from "./api/taskApi";
import Modal from "react-modal";

function App() {
  //#region
  const dateCalendar = new Date();
  const getMonth = dateCalendar.getMonth() + 1;
  const monthFormated = getMonth < 10 ? `0${getMonth}` : `${getMonth}`;
  const year = dateCalendar.getFullYear();
  //#endregion
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [isMonth, setIsMonth] = useState(`${year}-${monthFormated}`);

  const [numItens, setNumItens] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  //#region
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  //#endregion

  interface reduceValues {
    positive: boolean;
    money: number;
  }

  useEffect(() => {
    const callApi = async () => {
      const responseMonthTasks = await getMonthTasks(isMonth);
      setTasks(responseMonthTasks);
      setNumItens(responseMonthTasks.length);

      const incomeValue = responseMonthTasks.reduce(
        (prev: number, curr: reduceValues) => {
          if (curr.positive) {
            return curr.money + prev;
          }
          return prev;
        },
        0
      );

      const expenseValue = responseMonthTasks.reduce(
        (prev: number, curr: reduceValues) => {
          if (!curr.positive) {
            return curr.money + prev;
          }
          return prev;
        },
        0
      );

      const balanceValue = incomeValue - expenseValue;

      setBalance(balanceValue);
      setExpense(expenseValue);
      setIncome(incomeValue);

      setIsFetched(false);
      setIsOpen(false);
    };
    callApi();
  }, [isFetched]);

  async function handleMonth(e: any) {
    setIsMonth(e.target.value);
    const responseMonthTasks = await getMonthTasks(isMonth);
    setTasks(responseMonthTasks);
    setIsFetched(true);
  }

  function handleFetch() {
    setIsFetched(true);
  }

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
        <ModalCreation fetch={handleFetch} />
      </Modal>
      <div className="flex justify-center items-center w-screen h-screen">
        <main className="bg-pers-100 w-3/4 max-w-7xl h-[90%] rounded-[15px] flex flex-col p-8 pt-4">
          <div className="w-full h-12 flex justify-center items-center">
            <input
              className="text-black rounded-md p-1 cursor-pointer"
              type="month"
              max={`${year}-${monthFormated}`}
              value={isMonth}
              onChange={handleMonth}
            />
          </div>
          <div className="bg-gray-800 w-full h-auto flex justify-evenly mt-2 mb-2 rounded-md py-1">
            <p className="text-base">Itens: {numItens} </p>
            <p className="text-base">
              Receitas: <span className="text-green-400">R$ {income} </span>
            </p>
            <p className="text-base">
              Despesas: <span className="text-red-600">R$ {expense} </span>
            </p>
            <p className="text-base">
              Saldo:{" "}
              <span
                className={`${
                  balance >= 0 ? "text-green-400" : "text-red-600"
                }`}
              >
                R$ {balance}{" "}
              </span>
            </p>
          </div>
          <div className="w-full h-auto flex justify-center">
            <PlusCircle
              size={55}
              color="#52b2db"
              weight="fill"
              className="cursor-pointer mt-4 mb-8"
              onClick={openModal}
            />
          </div>
          <div className="overflow-auto">
            {tasks.map((task: any, index: number) => {
              return (
                <Card
                  key={task.id}
                  id={index + 1}
                  identificador={task.id}
                  description={task.descriptions}
                  value={task.money}
                  positive={task.positive}
                  dataRegistro={task.data_registro}
                  fetch={handleFetch}
                />
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
