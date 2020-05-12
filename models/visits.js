module.exports = (sequelize, DataTypes) => {

  const visits = sequelize.define('visits', {
    id: { type: DataTypes.INTEGER, field: 'id', primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.STRING, field: 'user_id' },
    name: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
  }, {
    timestamps: true
  });

  return visits;
};