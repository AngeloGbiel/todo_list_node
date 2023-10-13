export interface FormRegister {
    name:  string;
    email: string;
    password: string;
    image: string[];
}
export interface FormLogin {
    email: "string",
    password: "string"
}

export interface ContextType {
    registerUser: (user:FormRegister) => void,
    authorization: boolean,
    token: string,
    loginUser: (user: FormLogin) => void,
    userExist: boolean,
    userData: object
}