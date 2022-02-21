const {User} = require('../models');
const { signToken} = require('..utils/auth');

const resolvers ={
    Query:{
        me: async () => {
            return Book.find({});
        }
    }
}