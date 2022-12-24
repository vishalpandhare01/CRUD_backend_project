const { isValidObjectId } = require("mongoose")
const cardModel = require("../model/cardModel")
const costomerModel = require("../model/costomerModel")

//====================================== create card ============================================================
const createCard = async (req, res) => {
    try {
        let data = req.body
        if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, message: "All field requierd" }) }

        let { cardType, vision, customerID } = data
        let num = await cardModel.find()
        data.cardNumber = num.length + 1

        if (!cardType) { return res.status(400).send({ status: false, message: "cardType is required" }) }
        let cardTypes = cardModel.schema.obj.cardType.enum
        if (!cardTypes.includes(cardType)) { return res.status(400).send({ status: false, message: "cardType Should be 'REGULAR', 'SPECIAL'" }) }

        if (!vision) { return res.status(400).send({ status: false, message: "vision is required" }) }

        if (!customerID) { return res.status(400).send({ status: false, message: "customerID is required" }) }
        if (!isValidObjectId(customerID)) { return res.status(400).send({ status: false, message: "customerID should be valid" }) }

        let customerExistOrnot = await costomerModel.findOne({ _id: customerID, isDelete: false })
        if (!customerExistOrnot) { return res.status(400).send({ status: false, message: "customer not exist" }) }

        let uniquesCard = await cardModel.findOne({ customerID: customerID })
        if (uniquesCard) { return res.status(400).send({ status: false, message: "card is already exist" }) }

        let createData = await cardModel.create(data)
        res.status(201).send({ status: true, message: "Success", data: data })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}
//====================================== get all card ============================================================

const ListOfcard = async (req, res) => {
    try {
        let data = await cardModel.find().populate({
            path: "customerID",
            select: { _id: 0, __v: 0 }
        }).select({ _id: 0, __v: 0 }).sort({ cardNumber: 1 })
        res.status(201).send({ status: true, message: "Success", data: data })
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { createCard, ListOfcard }