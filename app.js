/* add your code here */

// Add your code here

document.addEventListener('DOMContentLoaded', () => {
    // Sample data for stock and user content (replace with actual data or API calls)
    const stockContent = `[
        {"symbol": "AAPL", "name": "Apple Inc.", "sector": "Technology", "subIndustry": "Consumer Electronics", "address": "Cupertino, CA"},
        {"symbol": "GOOGL", "name": "Alphabet Inc.", "sector": "Technology", "subIndustry": "Internet Services", "address": "Mountain View, CA"}
    ]`;

    const userContent = `[
        {
            "id": 1,
            "user": {
                "firstname": "John",
                "lastname": "Doe",
                "address": "123 Main St",
                "city": "New York",
                "email": "john@example.com"
            },
            "portfolio": [
                {"symbol": "AAPL", "owned": 50},
                {"symbol": "GOOGL", "owned": 10}
            ]
        },
        {
            "id": 2,
            "user": {
                "firstname": "Jane",
                "lastname": "Smith",
                "address": "456 Oak St",
                "city": "San Francisco",
                "email": "jane@example.com"
            },
            "portfolio": [
                {"symbol": "GOOGL", "owned": 20}
            ]
        }
    ]`;

    const stocksData = JSON.parse(stockContent);
    let userData = JSON.parse(userContent);
    
    const deleteButton = document.querySelector('#btnDelete');
    const saveButton = document.querySelector('#btnSave');

    // Generate initial user list
    generateUserList(userData, stocksData);

    // Handle delete user action
    deleteButton.addEventListener('click', (event) => {
        event.preventDefault();
        const userId = document.querySelector('#userID').value;
        const userIndex = userData.findIndex(user => user.id == userId);
        if (userIndex !== -1) {
            userData.splice(userIndex, 1); // Remove user from data
            generateUserList(userData, stocksData); // Re-render user list
        }
    });

    // Handle save/update user action
    saveButton.addEventListener('click', (event) => {
        event.preventDefault();

        const id = document.querySelector('#userID').value;
        const userIndex = userData.findIndex(user => user.id == id);

        if (userIndex !== -1) {
            // Update the user information with form data
            userData[userIndex].user.firstname = document.querySelector('#firstname').value;
            userData[userIndex].user.lastname = document.querySelector('#lastname').value;
            userData[userIndex].user.address = document.querySelector('#address').value;
            userData[userIndex].user.city = document.querySelector('#city').value;
            userData[userIndex].user.email = document.querySelector('#email').value;

            generateUserList(userData, stocksData); // Re-render updated user list
        }
    });

    // Generate user list dynamically
    function generateUserList(users, stocks) {
        const userList = document.querySelector('.user-list');
        userList.innerHTML = ''; // Clear existing list

        users.forEach(({ user, id }) => {
            const listItem = document.createElement('li');
            listItem.innerText = `${user.lastname}, ${user.firstname}`;
            listItem.setAttribute('id', id);
            userList.appendChild(listItem);
        });

        userList.addEventListener('click', (event) => handleUserListClick(event, users, stocks));
    }

    // Handle clicking on a user from the list
    function handleUserListClick(event, users, stocks) {
        const userId = event.target.id;
        const user = users.find(user => user.id == userId);
        if (user) {
            populateForm(user); // Fill form with selected user details
            renderPortfolio(user, stocks); // Display user's stock portfolio
        }
    }

    // Populate user form with selected user data
    function populateForm(data) {
        const { user, id } = data;
        document.querySelector('#userID').value = id;
        document.querySelector('#firstname').value = user.firstname;
        document.querySelector('#lastname').value = user.lastname;
        document.querySelector('#address').value = user.address;
        document.querySelector('#city').value = user.city;
        document.querySelector('#email').value = user.email;
    }

    // Render user's portfolio (list of stocks they own)
    function renderPortfolio(user, stocks) {
        const { portfolio } = user;
        const portfolioDetails = document.querySelector('.portfolio-list');
        portfolioDetails.innerHTML = ''; // Clear previous portfolio

        portfolio.forEach(({ symbol, owned }) => {
            const symbolEl = document.createElement('p');
            const sharesEl = document.createElement('p');
            const actionEl = document.createElement('button');

            symbolEl.innerText = `Stock: ${symbol}`;
            sharesEl.innerText = `Shares Owned: ${owned}`;
            actionEl.innerText = 'View';
            actionEl.setAttribute('id', symbol);

            portfolioDetails.appendChild(symbolEl);
            portfolioDetails.appendChild(sharesEl);
            portfolioDetails.appendChild(actionEl);
        });

        // Handle view stock button click
        portfolioDetails.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                viewStock(event.target.id, stocks);
            }
        });
    }

    // Display stock information when stock is selected
    function viewStock(symbol, stocks) {
        const stockArea = document.querySelector('.stock-form');
        if (stockArea) {
            const stock = stocks.find(s => s.symbol == symbol);
            if (stock) {
                document.querySelector('#stockName').textContent = stock.name;
                document.querySelector('#stockSector').textContent = stock.sector;
                document.querySelector('#stockIndustry').textContent = stock.subIndustry;
                document.querySelector('#stockAddress').textContent = stock.address;

                document.querySelector('#logo').src = `logos/${symbol}.svg`; // Assuming logo files exist
            }
        }
    }
});
