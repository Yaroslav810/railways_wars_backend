import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { generateUUId } from "../../core/utils/UUIDUtils";

class Game extends Model {
    public id!: number;
    public uuid!: string;
}

type GameStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): Game
}

export function initGameProvider(sequelize: Sequelize) {
    const gameProvider = <GameStatic>sequelize.define('Game', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false
        },
        uuid: {
            type: DataTypes.UUID,
            unique: true,
            allowNull: false
        }
    }, 
    {
        freezeTableName: true,
        createdAt: 'creationDate'
    })

    return {
        create() {
            return gameProvider.create({
                uuid: generateUUId()
            })
        },
        getGameByUuid(uuid: string) {
            return gameProvider.findOne({
                where: {
                    uuid: uuid
                }
            })
        }
    }
}