import { useForm, SubmitHandler } from "react-hook-form";
import Api from "../Api/Api";
import { useContext } from "react";
import { UserContext } from "../Context/Context";
import styled from "styled-components";
import {FormProps} from '../Types/interface'


const FormStyled = styled.div`
  display: flex;
  justify-content: center;
  /* background-color: yellow; */
  padding-bottom: 1.5rem;
  form {
    width: 55%;
    background-color: #ffffff;
    padding: 10px;
    display: flex;
    gap: 10px;
    border-radius: 5px;
    background: #fff;
    input[type="text"] {
      width: 90%;
      height: 2.3rem;
      /* margin: 10px; */
      border-radius: 10px;
      border: none;
      outline: none;
      padding-left: 10px;
      background: #031621;
      color: white;
      font-size: 1.06rem;
    }
    input[type="submit"] {
      width: 10%;
      border-radius: 10px;
      border: none;
      background: #031621;
      color: white;
      cursor: pointer;
    }
  }
`;

export default function Form() {
  const { token, AllTasks, edit,TaskEdit,id,setEdit } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormProps>();
  const AddTask: SubmitHandler<FormProps> = async (data: FormProps) => {
    await Api.post(`/todo/add`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        console.log("Tarefa adcionada");
        AllTasks();
        reset(); //Limpa após a tarefa ser adcionada no banco de dados
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const EditTask: SubmitHandler<FormProps> = async (data: FormProps) => {
    console.log(data)
    await Api.patch(`/todo/edit/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        console.log("Tarefa atualizada");
        AllTasks();
        reset(); //Limpa após a tarefa ser adcionada no banco de dados
        setEdit(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <FormStyled>
      {edit ? (
        <>
          <form onSubmit={handleSubmit(EditTask)}>
            <input
              type="text"
              placeholder="Add Task"
              className="form"
              {...register("task", { required: false })}
              defaultValue={TaskEdit}
            />
            <input type="submit" value="✔️" className="submit" />
          </form>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit(AddTask)}>
            <input
              type="text"
              placeholder="Add Task"
              className="form"
              {...register("task", { required: false })}
              defaultValue={''}
            />
            <input type="submit" value="+" className="submit" />
          </form>
        </>
      )}
    </FormStyled>
  );
}
