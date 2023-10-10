import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";

const SignUpStyled = styled.div`
  width: calc(100% - 20rem);
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

interface FormInput {
  name: string;
  email: string;
  password: string;
  image: [string];
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = async (data: FormInput) => {
    console.log(data);
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
          {errors?.email?.type === "required" && (
            <span>This field is required</span>
          )}

          {/* password */}
          <input
            type="password"
            placeholder="password"
            className="field"
            {...register("password", { required: true })}
          />
          {errors?.password?.type === "required" && (
            <span>This field is required</span>
          )}

          <input type="submit" value={"Sign In"} />
        </form>
      </div>
    </SignUpStyled>
  );
}
