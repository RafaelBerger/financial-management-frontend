import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_URL_PROD;

export const getMonthTasks = async (dataMonth: string) => {
  const response = await axios.get(`${BACKEND_URL}month/:${dataMonth}`);
  return response.data;
};

interface postArgs {
  descricao: string;
  dinheiro: number;
  positivo: boolean;
  data_registro: string;
}

export const postTasks = async (task: postArgs) => {
  const response = await axios.post(BACKEND_URL, {
    descriptions: task.descricao,
    money: task.dinheiro,
    positive: task.positivo,
    data_registro: task.data_registro,
  });

  return response;
};



export const deleteTask = async (id: number) => {
  const response = await axios.delete(BACKEND_URL + `${id}`);
  return response;
};

interface updateTaskArgs {
  id: number;
  descricao: string;
  dinheiro: number;
  positivo: boolean;
  data: string;
}

export const updateTaskApi = async ({ id, descricao, dinheiro, positivo, data }: updateTaskArgs) => {
  const response = await axios.put(BACKEND_URL + `${id}`, {
    description: descricao,
    money: dinheiro,
    positive: positivo,
    data_registro: data,
  });

  return response;
};

