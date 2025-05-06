const Memberapplications = require('../models/memberapplicationModel');

exports.createMemberapplication = async (req, res) => {
    try {
        
        const member = await Memberapplications.findByEmail(req.body.email); 
        if (member) {
            return res.status(401).json({ error: 'Application Email Already Exist' });
        }
        
        const member2 = await Memberapplications.findByPhone(req.body.phone); 
        if (member2) {
            return res.status(401).json({ error: 'Application Phone Already Exist' });
        }

        const result = await Memberapplications.create(req.body);
        res.status(201).json({ message: 'Memberapplication created', id: result.insertId });
    } catch (err) {
        console.error('Error creating Memberapplication:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllMemberapplications = async (req, res) => {
    try {
        const results = await Memberapplications.getAll();
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching Memberapplications:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAllMemberapplicationsByPage = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await Memberapplications.getAllByPage(Number(limit), Number(page), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalPages: Math.ceil(results.totalCount / limit),
      currentPage: page
    });
  } catch (err) {
    console.error('Error fetching Pagecategorys:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.approveMemberapplication = async (req, res) => {
    const id = req.params.id;
    try {
        await Memberapplications.approve(id, req.body);
        res.status(200).json({ message: 'Memberapplication Approved' });
    } catch (err) {
        console.error('Error updating Memberapplication:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.rejectMemberapplication = async (req, res) => {
    const id = req.params.id;
    try {
        await Memberapplications.reject(id, req.body);
        res.status(200).json({ message: 'Memberapplication Rejected' });
    } catch (err) {
        console.error('Error updating Memberapplication:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteMemberapplication = async (req, res) => {
    const id = req.params.id;
    try {
        await Memberapplications.delete(id);
        res.status(200).json({ message: 'Memberapplication deleted' });
    } catch (err) {
        console.error('Error deleting Memberapplication:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};