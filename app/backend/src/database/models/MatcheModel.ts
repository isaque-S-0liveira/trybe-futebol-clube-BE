import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SequelizeTeam from './TeamsModel';
// import OtherModel from './OtherModel';

class SequelizeMatche extends Model<InferAttributes<SequelizeMatche>,
InferCreationAttributes<SequelizeMatche>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

SequelizeMatche.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

SequelizeMatche.belongsTo(SequelizeTeam, { foreignKey: 'homeTeamId', as: 'homeTeam' });
SequelizeMatche.belongsTo(SequelizeTeam, { foreignKey: 'awayTeamId', as: 'awayTeam' });

SequelizeTeam.hasMany(SequelizeMatche, { foreignKey: 'homeTeamId', as: 'homeMatches' });
SequelizeTeam.hasMany(SequelizeMatche, { foreignKey: 'awayTeamId', as: 'awayMatches' });

export default SequelizeMatche;
