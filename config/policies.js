/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  UserController: {
    '*': 'isLoggedin',
    login: true,
    signUp: true,
    verification : true,
    forgotpassword :  true,
  },
  AccountController: {
    '*': 'isLoggedin'
  },
  TransactionController : {
    '*': 'isLoggedin'
  }

};
