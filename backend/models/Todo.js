import { DataTypes } from "sequelize";
import conn from "../db/conn.js";
import User from "./User.js";

const Todo = conn.define('Todo', {
    task: {
        type: DataTypes.STRING,
        allowNull: false
    },
    priority: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})

Todo.belongsTo(User)
User.hasMany(Todo)

export default Todo;