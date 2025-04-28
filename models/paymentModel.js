const db = require('../config/db');

exports.saveTransaction = (paymentIntentId, amount, status) => {
    const sql = 'INSERT INTO transactions (payment_intent_id, amount, status, note, created_at) VALUES (?, ?, ? , ? , NOW())';
    db.query(sql, [paymentIntentId, amount, status, ''], (err) => {
        if (err) console.error('Error saving transaction:', err);
    });
};

exports.updatePayment = async (data) => {
    
    const sql = 'UPDATE transactions SET status = ? , note = ? WHERE payment_intent_id = ?';
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