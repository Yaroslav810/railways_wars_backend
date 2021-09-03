import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { generateUUId } from "../../core/utils/UUIDUtils";

class Player extends Model {
    public id!: string;
    public name!: string;
    public teamId!: number;
    public gameId!: string;
}

type PlayerStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): Player
}

export function initPlayerProvider(sequelize: Sequelize) {
    const playerProvider = <PlayerStatic>sequelize.define('Player', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        teamId: {
            type: DataTypes.INTEGER,
            field: 'team_id'
        },
        gameId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Game',
                key: 'Id'
            },
            onDelete: "cascade",
            field: 'game_id'
        }
    }, 
    {
        freezeTableName: true,
        indexes: [
            {
                unique: true,
                fields: ['team_id', 'game_id']
            }
        ],
        underscored: true
    })

    return {
        create(player: {name: string, gameId: string, teamId: number | null}) {
            return playerProvider.create({
                id: generateUUId(),
                name: player.name,
                teamId: player.teamId,
                gameId: player.gameId
            })
        },
        getPlayerById(id: string) {
            return playerProvider.findOne({
                where: {
                    id: id
                }
            })
        },
        getPlayerByGameIdAndTeamId(gameId: string, teamId: number) {
            return playerProvider.findOne({
                where: {
                    gameId: gameId,
                    teamId: teamId
                }
            })
        },
        getPlayersByGameId(gameId: string) {
            return playerProvider.findAll({
                where: {
                    gameId: gameId
                }
            })
        },
        updateTeamIdById(teamId: number, id: string) {
            return playerProvider.update({
                teamId: teamId
            }, {
                where: {
                    id: id
                }
            })
        }
    }
}