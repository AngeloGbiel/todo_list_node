import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "../Context/Context";
import { FormLogin } from "../Types/interface";

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

export default function SignUp() {
  const {loginUser,userExist} = useContext(UserContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLogin>();
  const onSubmit: SubmitHandler<FormLogin> = async (data: FormLogin) => {
    // authenticate(Cookies.get('token')!)
    loginUser(data);
  };
  return (
    <SignUpStyled>
      <div className="model">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="field"
            {...register("email", { required: true })}
          />
          {errors?.email?.type === "required" ? (
            <span>All field is required</span>
          ) : !userExist ? (
            <span>Invalid email or password</span>
          ) : null }

          {/* password */}
          <input
            type="password"
            placeholder="password"
            className="field"
            {...register("password", { required: true })}
          />
          {errors?.email?.type === "required" ? (
            <span>All field is required</span>
          ) : !userExist ? (
            <span>Invalid email or password</span>
          ) : null }

          <input type="submit" value={"Sign In"} />
        </form>
      </div>
    </SignUpStyled>
  );
}
