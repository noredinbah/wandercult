const userEmail = document.getElementById('email').textContent; // Embed user email from server-side
console.log(userEmail);
document.querySelector('.formch').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this);

    fetch('/upload-profile-pic', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const newProfileImagePath = data.newProfileImagePath;

            // Update profile image path in localStorage
            let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
            accounts = accounts.map(account => {
                if (account.email === userEmail) {
                    account.profileImagePath = newProfileImagePath;
                    console.log("good")
                }else{
                    console.log("wow");
                    console.log(userEmail);
                }
                return account;
            });
            localStorage.setItem('accounts', JSON.stringify(accounts));

            // Update the image on the profile page
            document.querySelector('.imgprofile').src = newProfileImagePath;
            document.getElementById('profile-button').src = newProfileImagePath;

            alert('Profile picture updated successfully!');
            fetchhAccounts();
        } else {
            alert('Failed to upload profile picture.');
        }
    })
    .catch(error => console.error('Error uploading profile picture:', error));
});

document.querySelector('.log').addEventListener('click', function() {
    const currentProfileImagePath = document.querySelector('.imgprofile').src;
    
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    accounts = accounts.map(account => {
        if (account.email === userEmail) { // Replace with the user's email
            account.profileImagePath = currentProfileImagePath;
        }
        return account;
    });
    localStorage.setItem('accounts', JSON.stringify(accounts));

    // Now redirect to logout
    window.location.href = '/logout';
});


async function fetchhAccounts() {
    try {
        const response = await fetch('/accounts');
        const accounts = await response.json();
        return accounts; // Return the accounts
    } catch (error) {
        console.error('Error fetching accounts:', error);
        return []; // Return an empty array in case of an error
    }
}

function getAccountInfo(accounts, email) {
    const account = accounts.find(account => account.email === email);
    if (account) {
        return {
            username: account.username || null,
            profileImagePath: account.profileImagePath || null
        };
    }
    return {
        username: null,
        profileImagePath: null
    };
}



async function fetchAccounts() {
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    displayAccounts(accounts); // Display the accounts
}

function displayAccounts(accounts) {
    const accountsDiv = document.getElementById('accounts');
    accountsDiv.innerHTML = ''; // Clear previous accounts

    accounts.forEach((account) => {
        const accountCard = document.createElement('div');
        accountCard.innerHTML = `
            <div class="account-card">
                <img class="profile-image" src="${account.profileImagePath || 'assets/images/firefly.jpg'}" alt="${account.email}'s profile image"/>
                <p class="account-info">${account.username || 'Unknown'} (${account.email})</p>
                <button class="account-button" onclick="useAccount('${account.email}', '${account.password}')">Use</button>
                <button class="delete-button account-button" onclick="deleteAccount('${account.email}')">Delete</button>
            </div>
        `;
        accountsDiv.appendChild(accountCard);
    });
}

function useAccount(email, password) {
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    emailInput.value = email;
    passwordInput.value = password;
}

function deleteAccount(email) {
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    accounts = accounts.filter(account => account.email !== email);
    localStorage.setItem('accounts', JSON.stringify(accounts));
    fetchAccounts(); // Refresh the displayed accounts
}

document.getElementById('profile-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form data
    const username = document.getElementById('usernamee').value;
    const email = document.getElementById('emaill').value;
    const password = document.getElementById('passwordd').value;

    // Retrieve and update local storage
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    
    // Find the index of the account to update
    const accountIndex = accounts.findIndex(account => account.email === userEmail);

    // Create the updated account object
    const updatedAccount = {
        email: email,
        username: username,
        password: password, // Handle password securely in production
    };

    // Update or add the account in the local storage array
    if (accountIndex > -1) {
        // Update existing account
        accounts[accountIndex] = updatedAccount;
    } else {
        // Add new account if it doesn't exist
        accounts.push(updatedAccount);
    }

    // Store updated accounts array back to local storage
    localStorage.setItem('accounts', JSON.stringify(accounts));

    // Optionally submit the form data to the server
    this.submit(); // Allow the form to be submitted after updating local storage
});

function performSear(){
    const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
    window.location.href = `/home`;
    const filteredCities = allCities.filter((city) =>
      city.city.toLowerCase().startsWith(searchInput)
    );
    displayCities(filteredCities);
  }

  
  window.addEventListener('DOMContentLoaded', function() {
    document.getElementById("searchInput").addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        event.preventDefault(); 
        console.log("Enter pressed, triggering click.");
        document.getElementById("myButton").click(); 
      }
    });
  });
  
