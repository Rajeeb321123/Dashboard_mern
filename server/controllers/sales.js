// CONTROLLER FOR SALES


import OverallStat from "../models/OverallStat.js";

// FOR GETTING SALES


export const getSales = async (req, res) => {
  try {


    const overallStats = await OverallStat.find();

    // as we have only one overStat in mongodb so , sending only [0] is fine
    res.status(200).json(overallStats[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};