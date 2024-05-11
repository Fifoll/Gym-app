import { DataTypes } from 'sequelize';
import connection from '../db/sql.js';

const User = connection.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING, 
        allowNull: false
    }
}, {
    timestamps: false
});

connection.sync();

export default User;