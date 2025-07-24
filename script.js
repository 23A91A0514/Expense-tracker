// Get DOM elements
const amountInput = document.getElementById('amount');
const categorySelect = document.getElementById('category');
const addTransactionButton = document.getElementById('addTransactionButton');
const balanceElement = document.getElementById('balance');
const transactionList = document.getElementById('transactionList');

// Initialize the total balance and transaction list
let balance = 0;
let transactions = [];

// Function to update the balance display
function updateBalance() {
    balanceElement.textContent = balance.toFixed(2);
}

// Function to add a new transaction
function addTransaction() {
    const amount = parseFloat(amountInput.value);
    const category = categorySelect.value;

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount!');
        return;
    }

    // Add transaction
    const transaction = { amount, category };
    transactions.push(transaction);

    // Update balance
    balance += category === 'Income' ? amount : -amount;
    
    // Save the balance to localStorage
    localStorage.setItem('balance', balance.toFixed(2));
    
    // Add transaction to the list
    const li = document.createElement('li');
    li.classList.add(category.toLowerCase());
    li.innerHTML = `
        ${category}: $${amount.toFixed(2)}
        <button onclick="deleteTransaction(${transactions.length - 1})">Delete</button>
    `;
    transactionList.appendChild(li);

    // Update balance display
    updateBalance();

    // Clear input fields
    amountInput.value = '';
}

// Function to delete a transaction
function deleteTransaction(index) {
    const transaction = transactions[index];
    transactions.splice(index, 1);

    // Recalculate balance
    balance -= transaction.category === 'Income' ? transaction.amount : -transaction.amount;

    // Save the updated balance
    localStorage.setItem('balance', balance.toFixed(2));

    // Re-render the transaction list
    transactionList.innerHTML = '';
    transactions.forEach((transaction, i) => {
        const li = document.createElement('li');
        li.classList.add(transaction.category.toLowerCase());
        li.innerHTML = `
            ${transaction.category}: $${transaction.amount.toFixed(2)}
            <button onclick="deleteTransaction(${i})">Delete</button>
        `;
        transactionList.appendChild(li);
    });

    // Update balance display
    updateBalance();
}

// Event listener for the Add Transaction button
addTransactionButton.addEventListener('click', addTransaction);

// Load balance from localStorage if available
if (localStorage.getItem('balance')) {
    balance = parseFloat(localStorage.getItem('balance'));
}

// Update balance display
updateBalance();

// Load transactions from localStorage and render them
transactions = JSON.parse(localStorage.getItem('transactions')) || [];
transactions.forEach((transaction, i) => {
    const li = document.createElement('li');
    li.classList.add(transaction.category.toLowerCase());
    li.innerHTML = `
        ${transaction.category}: $${transaction.amount.toFixed(2)}
        <button onclick="deleteTransaction(${i})">Delete</button>
    `;
    transactionList.appendChild(li);
});
