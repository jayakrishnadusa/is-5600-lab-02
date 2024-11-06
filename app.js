document.addEventListener('DOMContentLoaded', function () {
    const users = [
        { id: 1, firstname: 'John', lastname: 'Doe', address: '123 Main St', city: 'Anytown', email: 'john.doe@example.com' },
        { id: 2, firstname: 'Jane', lastname: 'Smith', address: '456 Oak St', city: 'Othertown', email: 'jane.smith@example.com' }
    ];

    const userListElement = document.querySelector('.user-list');
    const form = document.querySelector('.userEntry');
    const btnSave = document.getElementById('btnSave');
    const btnDelete = document.getElementById('btnDelete');

    const userIDField = document.getElementById('userID');
    const firstnameField = document.getElementById('firstname');
    const lastnameField = document.getElementById('lastname');
    const addressField = document.getElementById('address');
    const cityField = document.getElementById('city');
    const emailField = document.getElementById('email');

    const portfolioListElement = document.querySelector('.portfolio-list');
    const stockLogo = document.getElementById('logo');
    const stockName = document.getElementById('stockName');
    const stockSector = document.getElementById('stockSector');
    const stockIndustry = document.getElementById('stockIndustry');
    const stockAddress = document.getElementById('stockAddress');

    let selectedUser = null;

    // Load the user list on the left panel
    function loadUserList() {
        userListElement.innerHTML = '';
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.firstname} ${user.lastname}`;
            li.addEventListener('click', () => selectUser(user.id));
            userListElement.appendChild(li);
        });
    }

    // Function to select a user and load the form with their details
    function selectUser(userId) {
        selectedUser = users.find(user => user.id === userId);
        if (selectedUser) {
            userIDField.value = selectedUser.id;
            firstnameField.value = selectedUser.firstname;
            lastnameField.value = selectedUser.lastname;
            addressField.value = selectedUser.address;
            cityField.value = selectedUser.city;
            emailField.value = selectedUser.email;
            loadPortfolio(selectedUser.id);
        }
    }

    // Save button functionality
    btnSave.addEventListener('click', function (event) {
        event.preventDefault();
        const userId = parseInt(userIDField.value);
        if (selectedUser) {
            // Update existing user
            selectedUser.firstname = firstnameField.value;
            selectedUser.lastname = lastnameField.value;
            selectedUser.address = addressField.value;
            selectedUser.city = cityField.value;
            selectedUser.email = emailField.value;
        } else {
            // Add new user
            const newUser = {
                id: users.length + 1,
                firstname: firstnameField.value,
                lastname: lastnameField.value,
                address: addressField.value,
                city: cityField.value,
                email: emailField.value
            };
            users.push(newUser);
            selectedUser = newUser;
        }
        loadUserList();
        form.reset();
        selectedUser = null;
    });

    // Delete button functionality
    btnDelete.addEventListener('click', function (event) {
        event.preventDefault();
        if (selectedUser) {
            const index = users.findIndex(user => user.id === selectedUser.id);
            users.splice(index, 1);
            loadUserList();
            form.reset();
            selectedUser = null;
            portfolioListElement.innerHTML = '';  // Clear portfolio
        }
    });

    // Dummy portfolio data
    const portfolios = {
        1: [
            { symbol: 'AAPL', shares: 10, logo: 'https://logo.clearbit.com/apple.com', name: 'Apple Inc.', sector: 'Technology', industry: 'Consumer Electronics', address: 'Cupertino, CA' },
            { symbol: 'MSFT', shares: 5, logo: 'https://logo.clearbit.com/microsoft.com', name: 'Microsoft Corporation', sector: 'Technology', industry: 'Software', address: 'Redmond, WA' }
        ],
        2: [
            { symbol: 'GOOGL', shares: 8, logo: 'https://logo.clearbit.com/google.com', name: 'Google LLC', sector: 'Technology', industry: 'Search Engines', address: 'Mountain View, CA' }
        ]
    };

    // Load portfolio for the selected user
    function loadPortfolio(userId) {
        const userPortfolio = portfolios[userId] || [];
        portfolioListElement.innerHTML = '';
        userPortfolio.forEach(stock => {
            const stockRow = document.createElement('div');
            stockRow.innerHTML = `
                <p>${stock.symbol}</p>
                <p>${stock.shares}</p>
                <button class="view-details">View</button>
            `;
            stockRow.querySelector('.view-details').addEventListener('click', () => showStockDetails(stock));
            portfolioListElement.appendChild(stockRow);
        });
    }

    // Display stock details in the StockDetails section
    function showStockDetails(stock) {
        stockLogo.src = stock.logo;
        stockName.textContent = stock.name;
        stockSector.textContent = stock.sector;
        stockIndustry.textContent = stock.industry;
        stockAddress.textContent = stock.address;
    }

    // Initialize the dashboard
    loadUserList();
});
