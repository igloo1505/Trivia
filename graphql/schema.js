const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLSchema
} = require("graphql");
const Axios = require("axios");
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Organization = require("../models/Organization");
const bcrypt = require("bcryptjs");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    admin: { type: GraphQLBoolean },
    email: { type: GraphQLString },
    organization: { type: OrganizationType },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    date: { type: GraphQLString }
  })
});

const OrganizationType = new GraphQLObjectType({
  name: "Organization",
  fields: () => ({
    organizationName: { type: GraphQLString },
    organizationAdminPassword: { type: GraphQLString },
    organizationUserPassword: { type: GraphQLString }
  })
});

// !! Root query required for every project
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: {
        name: { type: GraphQLString }
      },
      resolve(parent, args) {
        //!! Bcrypyt here for user password and admin credentials
        // Some method here to get single customer specifics
        return Axios.get("mongoURI").then(res => res.data);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        let Users = User.find();
        return Users;
      }
    },
    organization: {
      type: OrganizationType,
      args: {
        organizationAdminPassword: { type: GraphQLString }
      },
      resolve(parent, args) {
        let orgs = Organization.findOne({
          organizationAdminPassword: organizationAdminPassword
        });
        return orgs;
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        admin: { type: GraphQLBoolean },
        password: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        organization: { type: GraphQLNonNull(GraphQLString) },
        city: { type: GraphQLNonNull(GraphQLString) },
        state: { type: GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLString }
      },
      resolve(parent, args) {
        const salt = bcrypt.genSalt(10);
        args.password = bcrypt.hash(args.password, salt);
        let user = new User({
          name: args.name,
          password: args.password,
          email: args.email,
          organization: args.organization,
          city: args.city,
          state: args.state
        });
        return user.save().then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
