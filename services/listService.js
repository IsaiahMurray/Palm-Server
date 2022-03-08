const chalk = require("chalk");
const { ListModel } = require("../models");

const create = async({title, description, userId}) => {
    try {
        const newList = await ListModel.create({title, description, userId});
        return newList
    } catch (e) {
        throw e;
    }
}

const getaAll = async({}) => {
    try {
        
        return
    } catch (e) {
        throw e;
    }
}

const getbyId = async({}) => {
    try {
        
        return
    } catch (e) {
        throw e;
    }
}

const getbyTitle = async({}) => {
    try {
        
        return
    } catch (e) {
        throw e;
    }
}

const modify = async({}) => {
    try {
        
        return
    } catch (e) {
        throw e;
    }
}

const remove = async({}) => {
    try {
        
        return
    } catch (e) {
        throw e;
    }
}

const removeMany = async({}) => {
    try {
        
        return
    } catch (e) {
        throw e;
    }
}

module.exports = {
    create,
    getaAll,
    getbyId,
    getbyTitle,
    modify,
    remove,
    removeMany
}