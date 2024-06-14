require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

let users = [];

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Неправильное имя пользователя или пароль' });
    }
});

app.get('/api/balance', (req, res) => {
    const { username } = req.query;
    const user = users.find(u => u.username === username);
    if (user) {
        res.json({ balance: user.balance });
    } else {
        res.json({ message: 'Пользователь не найден' });
    }
});

app.post('/api/transfer', (req, res) => {
    const { senderUsername, recipient, amount } = req.body;
    const sender = users.find(u => u.username === senderUsername);
    const recipientUser = users.find(u => u.username === recipient);

    if (!recipientUser) {
        return res.json({ message: 'Получатель не найден' });
    }

    if (sender.balance < amount) {
        return res.json({ message: 'Недостаточно средств' });
    }

    sender.balance -= amount;
    recipientUser.balance += amount;
    const transaction = { recipient, amount, date: new Date().toLocaleString() };
    sender.transactions.push(transaction);
    recipientUser.transactions.push({ recipient: sender.username, amount, date: new Date().toLocaleString() });

    res.json({ message: 'Перевод успешен' });
});

app.post('/api/admin', (req, res) => {
    const { code } = req.body;
    if (code === '2357') {
        res.json({ success: true, users });
    } else {
        res.status(403).json({ success: false, message: 'Неверный код' });
    }
});

app.post('/api/admin/register', (req, res) => {
    const { username, password, balance } = req.body;
    if (users.find(u => u.username === username)) {
        return res.json({ message: 'Пользователь уже существует' });
    }
    const user = { username, password, balance, transactions: [] };
    users.push(user);
    res.json({ message: 'Пользователь зарегистрирован' });
});

app.post('/api/admin/setbalance', (req, res) => {
    const { username, balance } = req.body;
    const user = users.find(u => u.username === username);
    if (user) {
        user.balance = balance;
        res.json({ message: 'Баланс обновлен' });
    } else {
        res.json({ message: 'Пользователь не найден' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
