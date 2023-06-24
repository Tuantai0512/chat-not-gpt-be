const conversation = require('../models/mongoModel/conversation');
const Message = require('../models/mongoModel/message');

let createNewMessage = async(dataMessage) => {
    const newMessage = new Message(dataMessage);
    try{
        const saveMessage = await newMessage.save();
        return saveMessage
    }catch(err){
        return err
    }
}

let getAllMessagesByConverId = async(conversationId) => {
    try{
        const message = await Message.find({
            conversationId
        })
        return message
    }catch(err){
        return err
    }
}

module.exports = {
    createNewMessage,
    getAllMessagesByConverId
}