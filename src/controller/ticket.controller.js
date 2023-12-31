import TicketManager from "../DAL/dao/ticketManager.js";
const Ticket = new TicketManager()

export const postTicket = async (req, res) => {
    const { cid } = req.params
    if (!cid) return res.status(400).json({ status: "error", error: "Cid must be provided by params" })
    try {
        const ticket = await Ticket.createTicket(cid)
        return res.status(201).json({ status: "success", payload: ticket })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", error: error.message })
    }
}