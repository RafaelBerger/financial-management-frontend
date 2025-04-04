import axios from "axios";

const BACKEND_URL = "http://localhost:8080/";

interface getMonthArgs {
  dataMonth: string;
}

export const getMonthTasks = async (dataMonth: getMonthArgs) => {
  const response = await axios.get(`${BACKEND_URL}month/:${dataMonth}`);
  return response.data;
};

interface postArgs {
  descricao: string;
  dinheiro: number;
  positivo: boolean;
  data_registro: string;
}

export const postTasks = async (
  descricao: postArgs,
  dinheiro: postArgs,
  positivo: postArgs,
  data: postArgs
) => {
  const response = await axios.post(BACKEND_URL, {
    descriptions: descricao,
    money: dinheiro,
    positive: positivo,
    data_registro: data,
  });

  return response;
};

interface deleteTaskArgs {
  id: number;
}

export const deleteTask = async (id: deleteTaskArgs) => {
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

export const updateTaskApi = async (
  id: updateTaskArgs,
  descricao: updateTaskArgs,
  dinheiro: updateTaskArgs,
  positivo: updateTaskArgs,
  data: updateTaskArgs
) => {
  const response = await axios.put(BACKEND_URL + `${id}`, {
    description: descricao,
    money: dinheiro,
    positive: positivo,
    data_registro: data,
  });
  return response;
};
