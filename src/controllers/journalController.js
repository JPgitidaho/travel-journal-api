import Journal from "../models/Journal.js";

export const createJournal = async (req, res) => {
  try {
    const journal = new Journal({ ...req.body, user: req.user.id });
    await journal.save();
    res.status(201).json({ message: "Journal created", journal });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getJournals = async (req, res) => {
  try {
    const journals = await Journal.find({ user: req.user.id });
    res.status(200).json(journals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getJournalById = async (req, res) => {
  try {
    const journal = await Journal.findOne({ _id: req.params.id, user: req.user.id });
    if (!journal) return res.status(404).json({ error: "Journal not found" });
    res.status(200).json(journal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateJournal = async (req, res) => {
  try {
    const journal = await Journal.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!journal) return res.status(404).json({ error: "Journal not found" });
    res.status(200).json({ message: "Journal updated", journal });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteJournal = async (req, res) => {
  try {
    const journal = await Journal.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!journal) return res.status(404).json({ error: "Journal not found" });
    res.status(200).json({ message: "Journal deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
