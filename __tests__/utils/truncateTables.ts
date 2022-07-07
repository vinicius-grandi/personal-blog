import db from '../../db/models';

const { sequelize } = db as any;

const truncateTables = async () => Promise.resolve(sequelize.truncate({
  cascade: true, restartIdentity: true,
}));

export default truncateTables;
