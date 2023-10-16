import { useContext, useEffect, useState } from "react";
import Api from "../Api/Api";
import { UserContext } from "../Context/Context";
import styled from "styled-components";
import { FormRegister } from "../Types/interface";
import { SubmitHandler, useForm } from "react-hook-form";

const SignUpStyled = styled.div`
  width: calc(100% - 20rem);
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    color: #d93025;
    font-size: 16px;
    margin-top: 3px;
  }
  .model {
    display: flex;
    flex-direction: column;
    font-size: 1.3rem;
    width: 20rem;
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      .field {
        color: white;
        border: 1px solid #fff;
        margin-top: 18px;
        width: 100%;
        height: 3rem;
        align-items: center;
        border-radius: 10px;
        background: transparent;
        padding-left: 20px;
        font-size: 1.1rem;
        font-family: Inter;
      }
      input[type="file"] {
        display: flex;
        align-items: center;
        padding-top: 14px;
        font-size: 0.8rem;
        color: rgba(51, 51, 51, 0);
      }
      input[type="submit"] {
        display: flex;
        margin-top: 18px;
        width: 100%;
        height: 3rem;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        background: #00d1ff;
        color: #000000;
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        border: none;
      }
    }
  }
`;

interface PropsCurrentUser {
    name: string
}

export default function EditUser() {
  const { token,editUser } = useContext(UserContext);
  const [currentUser,setCurrentUser] = useState<PropsCurrentUser>()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegister>();
  const onSubmit: SubmitHandler<FormRegister> = async (data: FormRegister) => {
    editUser(data, token)
    window.location.reload();
  };

  useEffect(() => {
    Api.get("/getuser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response)=>{
        setCurrentUser(response.data)
    });
  }, [token]);

  return (
    <SignUpStyled>
      <div className="model">
        <h2>Edit profile</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <input
            type="text"
            placeholder="Username"
            className="field"
            defaultValue={currentUser != undefined ? currentUser.name : ''}
            {...register("name", { required: true })}
          />
          {errors?.name?.type === "required" && (
            <span>This field is required</span>
          )}

          {/* image */}
          <input
            type="file"
            placeholder="Image"
            className="field"
            {...register("image", { required: false })}
          />

          <input type="submit" value={"Save changes"} />
        </form>
      </div>
    </SignUpStyled>
  );
}
