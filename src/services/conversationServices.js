const Conversation = require('../models/mongoModel/conversation');

let createConversation = async (senderId, receiveId) => {
    const newConversation = new Conversation({
        members: [senderId, receiveId]
    });

    try {
        const saveConversation = await newConversation.save();
        return saveConversation;
    } catch (e) {
        console.log(e);
    }
}

let getAllConversation = async (userId) => {
    try {
        const allConversation = await Conversation.find({
            members: { $in: [userId] }
        })
        return allConversation
    } catch (err) {
        return err
    }
}

module.exports = {
    createConversation,
    getAllConversation
}