'use strict';

/**
 * Define task DB object
 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Task', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    info: DataTypes.STRING,
    created: DataTypes.DATE,
    reserved: DataTypes.BOOLEAN,
    completed: DataTypes.BOOLEAN
  }, {
    classMethods: {
      /**
       * Reserve task for user processing
       */
      reserve: function(callback) {
        return this.findOne({ where: {reserved: false, completed: false} })
          .then(function(result) {
              if(result) {
                result.setDataValue('reserved', true);
                return result.save({fields: ['reserved']});
              }

              return result;
          });
      }
    }
  });
};
