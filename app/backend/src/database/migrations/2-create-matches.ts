import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable('matches', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
        home_team_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            field: 'home_team_id',
            references: {
                // Informa a tabela da referência da associação
                model: 'teams',
                // Informa a coluna da referência que é a chave correspondente
                key: 'id',
              },
          },
        home_team_goals: {
           type: DataTypes.INTEGER,
           allowNull: false,
        },
        away_team_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            field: 'away_team_id',
            references: {
                model: 'teams',
                key: 'id',
              },
          },
        away_team_goals: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         in_progress: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
         }
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  },
};