const conversationServices = require('../services/conversationServices');

let handleCreateNewConversation = async(req, res) => {
    let message = await conversationServices.createConversation(req.body.senderId, req.body.receiverId);
    return res.status(200).json(message)
}

let handleGetAllConversation = async(req, res) => {
    let message = await conversationServices.getAllConversation(req.params.userId);
    return res.status(200).json(message);
}

module.exports = {
    handleCreateNewConversation,
    handleGetAllConversation
}