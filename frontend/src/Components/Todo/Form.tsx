import { useForm, SubmitHandler} from "react-hook-form";
import Api from "../Api/Api";
import { useContext } from "react";
import { UserContext } from "../Context/Context";
import styled from "styled-components";

interface FormProps {
  task: string;
}

const FormStyled = styled.div`
  display: flex;
  justify-content: center;
  form {
    width: 55%;
    background-color: #ffffff;
    padding: 10px;
    display: flex;
    gap: 10px;
    border-radius: 5px;
    background: #FFF;
    input[type=text]{
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
    input[type=submit]{
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
  const { token } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormProps>();
  const onSubmit: SubmitHandler<FormProps> = async (data: FormProps) => {
    await Api.post("/todo/add", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        console.log("Tarefa adcionada");
        reset() //Limpa após a tarefa ser adcionada no banco de dados
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <FormStyled>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Add Task"
          className="form"
          {...register("task", { required: true })}
        />
        {errors?.task?.type === "required" && (
          <span>This field is required</span>
        )}
        <input 
            type="submit"
            value="+"
            className="submit"
        />
      </form>
    </FormStyled>
  );
}