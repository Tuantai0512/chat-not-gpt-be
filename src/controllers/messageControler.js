const messageServices = require('../services/messageServices');

let handleCreateNewMessage = async(req, res) => {
    const message = await messageServices.createNewMessage(req.body);
    return res.status(200).json(message);
}

let handleGetAllMessageByConverId = async(req, res) => {
    const message = await messageServices.getAllMessagesByConverId(req.params.conversationId);
    return res.status(200).json(message);
}

module.exports = {
    handleCreateNewMessage,
    handleGetAllMessageByConverId
}