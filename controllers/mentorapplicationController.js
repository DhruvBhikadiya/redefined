const Mentorapplications = require('../models/mentorapplicationModel');

exports.createMentorapplication = async (req, res) => {
    try {
        
        const member = await Mentorapplications.findByEmail(req.body.email); 
        if (member) {
            return res.status(401).json({ error: 'Application Already Exist' });
        }

        const result = await Mentorapplications.create(req.body);
        res.status(201).json({ message: 'Mentorapplication created', id: result.insertId });
    } catch (err) {
        console.error('Error creating Mentorapplication:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllMentorapplications = async (req, res) => {
    try {
        const results = await Mentorapplications.getAll();
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching Mentorapplications:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAllMentorApplicationsByPage = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await Mentorapplications.getAllByPage(Number(limit), Number(page), searchtxt);

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

exports.updateMentorapplication = async (req, res) => {
    const id = req.params.id;
    try {
        await Mentorapplications.update(id, req.body);
        res.status(200).json({ message: 'Mentorapplication updated' });
    } catch (err) {
        console.error('Error updating Mentorapplication:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.approveMentorapplication = async (req, res) => {
    const id = req.params.id;
    try {
        await Mentorapplications.approve(id, req.body);
        res.status(200).json({ message: 'Mentorapplication Approved' });
    } catch (err) {
        console.error('Error updating Mentorapplication:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.rejectMentorapplication = async (req, res) => {
    const id = req.params.id;
    try {
        await Mentorapplications.reject(id, req.body);
        res.status(200).json({ message: 'Mentorapplication Rejected' });
    } catch (err) {
        console.error('Error updating Mentorapplication:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteMentorapplication = async (req, res) => {
    const id = req.params.id;
    try {
        await Mentorapplications.delete(id);
        res.status(200).json({ message: 'Mentorapplication deleted' });
    } catch (err) {
        console.error('Error deleting Mentorapplication:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
