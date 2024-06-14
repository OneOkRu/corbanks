function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('loginSection').style.display = 'none';
            document.getElementById('userSection').style.display = 'block';
            sessionStorage.setItem('username', username);
        } else {
            alert(data.message);
        }
    });
}

function checkBalance() {
    const username = sessionStorage.getItem('username');

    fetch(`/api/balance?username=${username}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('balance').innerText = `Баланс: ${data.balance}`;
    });
}

function transfer() {
    const senderUsername = sessionStorage.getItem('username');
    const recipient = document.getElementById('recipient').value;
    const amount = parseFloat(document.getElementById('amount').value);

    fetch('/api/transfer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senderUsername, recipient, amount }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    });
}

function adminLogin() {
    const code = document.getElementById('promoCode').value;

    fetch('/api/admin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('adminSection').style.display = 'block';
            document.getElementById('promoCodeSection').style.display = 'none';
            document.getElementById('adminData').innerText = JSON.stringify(data.users, null, 2);
        } else {
            alert(data.message);
        }
    });
}

function adminRegisterUser() {
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    const balance = parseFloat(document.getElementById('newBalance').value);

    fetch('/api/admin/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, balance }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    });
}

function adminSetBalance() {
    const username = document.getElementById('setBalanceUsername').value;
    const balance = parseFloat(document.getElementById('setBalanceAmount').value);

    fetch('/api/admin/setbalance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, balance }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    });
}
