// @description     Booking controller
// @route           POST /api/booking
// @access          Private

export const booking = async (req, res) => {
    return res.json(res.booking);
}