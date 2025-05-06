const db = require('../config/db');

exports.saveTransaction = (paymentIntentId, currency, amount, status, email) => {
    const sql = 'INSERT INTO transactions (email, memberId, payment_intent_id, amount, currency, status, note, created_at) VALUES (?, ?, ?, ?, ? , ? , ? , NOW())';
    db.query(sql, [email, 0, paymentIntentId, (amount/100), currency, status, ''], (err) => {
        if (err) console.error('Error saving transaction:', err);
    });
};

exports.updatePayment = async (data) => {
    
    const sql = 'UPDATE transactions SET memberId = ? , status = ? , note = ? WHERE payment_intent_id = ?';
    try {
        const [results] = await db.execute(sql, [data.memberId, data.status, data.note, data.payment_intent_id]);

        let dataJson = {
            status: 'success',
            data: results
        }
        return dataJson;
    } catch (err) {
        throw err;
    }
};

exports.saveEventTransaction = (eventId, memberId, paymentIntentId, currency, amount, status, email) => {
    const sql = 'INSERT INTO eventpayment (eventId, email, memberId, payment_intent_id, amount, currency, status, note, created_at) VALUES (?, ?, ?, ?, ? , ? , ? , ? , NOW())';
    db.query(sql, [eventId, email, memberId, paymentIntentId, (amount/100), currency, status, ''], (err) => {
        if (err) console.error('Error saving transaction:', err);
    });
};

exports.updateEventPayment = async (data) => {
    
    const sql = 'UPDATE eventpayment SET status = ? , note = ? WHERE payment_intent_id = ?';
    try {
        const [results] = await db.execute(sql, [data.status, data.note, data.payment_intent_id]);

        let dataJson = {
            status: 'success',
            data: results
        }
        return dataJson;
    } catch (err) {
        throw err;
    }
};