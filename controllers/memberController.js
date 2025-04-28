const Members = require('../models/memberModel');

exports.createMember = async (req, res) => {
    try {
        
        const member = await Members.findByEmail(req.body.email); 
        if (member) {
            return res.status(401).json({ error: 'Member Already Exist' });
        }

        const result = await Members.create(req.body);
        res.status(201).json({ message: 'Member created', id: result.insertId });
    } catch (err) {
        console.error('Error creating Member:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllMembers = async (req, res) => {
    try {
        const results = await Members.getAll();
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching Members:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAllMembersByPage = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await Members.getAllByPage(Number(limit), Number(page), searchtxt);

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

exports.updateMember = async (req, res) => {
    const id = req.params.id;
    try {
        await Members.update(id, req.body);
        res.status(200).json({ message: 'Member updated' });
    } catch (err) {
        console.error('Error updating Member:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteMember = async (req, res) => {
    const id = req.params.id;
    try {
        await Members.delete(id);
        res.status(200).json({ message: 'Member deleted' });
    } catch (err) {
        console.error('Error deleting Member:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};