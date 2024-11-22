let transactions = [];

function addTransaction() {
    const date = document.getElementById('transaction-date').value;
    const description = document.getElementById('transaction-description').value;
    const category = document.getElementById('transaction-category').value;
    const amount = parseFloat(document.getElementById('transaction-amount').value);

    if (date && description && !isNaN(amount)) {
        transactions.push({ date, description, category, amount });
        updateTransactionList();
        updateTotals();
        clearInputs();
    } else {
        alert("Please fill in all fields correctly.");
    }
}

function updateTransactionList() {
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = '';
    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.description}</td>
            <td>${transaction.category}</td>
            <td>$${transaction.amount.toFixed(2)}</td>
        `;
        transactionList.appendChild(row);
    });
}

function updateTotals() {
    const totalIncome = transactions
        .filter(t => t.category === 'Income')
        .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
        .filter(t => t.category === 'Expense')
        .reduce((sum, t) => sum + t.amount, 0);
    
    document.getElementById('total-income-amount').innerText = `$${totalIncome.toFixed(2)}`;
    document.getElementById('total-expenses-amount').innerText = `$${totalExpenses.toFixed(2)}`;
    document.getElementById('total-balance').innerText = `$${(totalIncome - totalExpenses).toFixed(2)}`;
}

function clearInputs() {
    document.getElementById('transaction-date').value = '';
    document.getElementById('transaction-description').value = '';
    document.getElementById('transaction-category').value = 'Income';
    document.getElementById('transaction-amount').value = '';
}