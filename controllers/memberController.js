const Members = require('../models/memberModel');
const jwt = require("jsonwebtoken");
const { sendEmail } = require('../utils/sendEmail');
const emaillog = require('../models/emaillogModel');
const axios = require('axios');
const db = require('../config/db');

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

exports.getMemberDetail = async (req, res) => {
    const id = req.params.id;
    try {
        const results = await Members.getMemberDetail(id);
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching Members:', err);
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
exports.getAllMentors = async (req, res) => {
    try {
        const results = await Members.getAllMentors();
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
exports.getAllMentorsByPage = async (req, res) => {
    try {
        const { limit = 10, page = 1, searchtxt = '' } = req.query;

        const results = await Members.getAllMentorsByPage(Number(limit), Number(page), searchtxt);

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

exports.updateMemberCredit = async (req, res) => {
    const id = req.params.id;
    try {
        await Members.updateCredit(id, req.body);
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

exports.loginMember = async (req, res) => {
    try {
            const { email, password } = req.body;
    
            const Member = await Members.findByEmail(email);
            if (!Member || !Member.data) {
                return res.status(404).json({ error: 'Member not found' });
            }
    
            if (password !== Member.data.password) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
    
            let token;
            if (Member.data) {
                token = jwt.sign({ id: Member.data.id, type: 'Member' }, process.env.JWT_KEY);
                await Members.updateMemberToken(Member.data.id, token);
            }
    
            const [templates] = await db.execute('SELECT * FROM emailtemplate');
    
            let selectedTemplate = templates.find(f => f.name == "Member Login");
    
            let sendingContent = selectedTemplate.content.replaceAll('[name]',Member.data.fullName);
    
            const emailData = {
                to: email,
                subject: selectedTemplate.subject,
                html: sendingContent
            };
    
            await sendEmail(emailData);
    
            let maillogReq = {
                recipient: emailData.to,
                message: emailData.html,
                subject: emailData.subject
            }
    
            emaillog.create(maillogReq, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Email sent but failed to log' });
                }
                res.status(200).json({ message: 'Email sent & logged successfully!' });
            });
    
            res.status(200).json({
                message: 'Login successful',
                Member: Member.data,
                token: token
            });
    } catch (err) {
        console.error('Error logging in Member:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};