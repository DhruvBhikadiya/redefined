const Perks = require('../models/perkModel');

exports.createPerk = async (req, res) => {
  try {
    const result = await Perks.create(req.body);
    res.status(201).json({ message: 'Perk created', id: result.insertId });
  } catch (err) {
    console.error('Error creating Perk:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllPerks = async (req, res) => {
  try {
    const results = await Perks.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Perks:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllPerksByPage = async (req, res) => {
  try {
    const { limit = 10, Perk = 1, searchtxt = '' } = req.query;
    
    const results = await Perks.getAllByPage(Number(limit), Number(Perk), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalPerks: Math.ceil(results.totalCount / limit),
      currentPerk: Perk
    });
  } catch (err) {
    console.error('Error fetching Perks:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updatePerk = async (req, res) => {
  const id = req.params.id;
  try {
    await Perks.update(id, req.body,req.userDetails);
    res.status(200).json({ message: 'Perk updated' });
  } catch (err) {
    console.error('Error updating Perk:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deletePerk = async (req, res) => {
  const id = req.params.id;
  try {
    await Perks.delete(id,req.userDetails);
    res.status(200).json({ message: 'Perk deleted' });
  } catch (err) {
    console.error('Error deleting Perk:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
