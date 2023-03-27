/**
 * Datastores
 * (sails.config.datastores)
 *
 * A set of datastore configurations which tell Sails where to fetch or save
 * data when you execute built-in model methods like `.find()` and `.create()`.
 *
 *  > This file is mainly useful for configuring your development database,
 *  > as well as any additional one-off databases used by individual models.
 *  > Ready to go live?  Head towards `config/env/production.js`.
 *
 * For more information on configuring datastores, check out:
 * https://sailsjs.com/config/datastores
 */

module.exports.datastores = {

  default: {

      adapter: 'sails-mongo',
      // url: 'mongodb://parimalta:002fAR367LnXiXRNGYyX6y0X@15.206.7.200:28017/parimalta?authSource=admin',
      url: 'mongodb+srv://root:root@expense-manager.gu7gxdk.mongodb.net/expense',
      // url : `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@15.206.7.200:28017/parimalta?authSource=admin`,
      // url:  'mongodb+srv://root:root@expense-manager.ehogspv.mongodb.net/expense'
  },
};
