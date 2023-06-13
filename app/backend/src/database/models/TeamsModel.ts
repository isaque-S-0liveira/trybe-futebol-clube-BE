import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SequelizeMatche from './MatcheModel';
// import OtherModel from './OtherModel';

class SequelizeTeam extends Model<InferAttributes<SequelizeTeam>,
InferCreationAttributes<SequelizeTeam>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

SequelizeTeam.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});

/**
    * `Workaround` para aplicar as associations em TS:
    * Associations 1:N devem ficar em uma das instâncias de modelo
    * */

SequelizeMatche.belongsTo(SequelizeTeam, { foreignKey: 'homeTeamId', as: 'teams' });
SequelizeMatche.belongsTo(SequelizeTeam, { foreignKey: 'awayTeamId', as: 'matches' });

SequelizeTeam.hasMany(SequelizeMatche, { foreignKey: 'homeTeamId', as: 'matches' });
SequelizeTeam.hasMany(SequelizeMatche, { foreignKey: ' awayTeamId', as: 'matches' });

export default SequelizeTeam;
