export interface Itodo {
    id: number
    task: string
    priority: boolean
}

export interface FormProps {
    task: string;
}

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
    userData: object,
    logout: () => void,
    editUser: (data:FormEditUser, token: string) =>void,
    AllTasks: () => void,
    tasks: Itodo[],
    DeleteTask: (id:number) => void,
    edit: boolean,
    TaskEdit: string,
    GetTaskForEdit: (id:number)=>void,
    id: number | undefined //mudar depois,
    setEdit: (edit: boolean) => void
}

export interface FormEditUser {
    name: string,
    image: string[]
}