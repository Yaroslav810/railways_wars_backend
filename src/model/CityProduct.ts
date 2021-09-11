import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize";
import {generateUUId} from "../../core/utils/UUIDUtils";

class CityProduct extends Model {
    public id!: number;
    public cityId!: number;
    public productId!: number;
    public price!: number;
    public teamId!: number;
}

type CityProductStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): CityProduct;
}

export function initCityProductProvider(sequelize: Sequelize) {
    const CityProductProvider = <CityProductStatic>sequelize.define('city_product', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false,
            defaultValue: generateUUId
        },
        cityId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'city',
                key: 'city_id'
            },
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION'
        },
        productId: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        price: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        teamId: {
            type: DataTypes.UUID,
            allowNull: false,
        }
    });
    return {
        get(CityProductID: string) {
            return CityProductProvider.findByPk(CityProductID)
        }
    }
}