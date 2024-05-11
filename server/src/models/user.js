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
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 255],
        }
    }
}, {
    timestamps: false
});

connection.sync();

export default User;