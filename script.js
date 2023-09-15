function createUserCard(user) {
    const userCard = document.createElement("div");
    userCard.classList.add("col-md-");

    const card = document.createElement("div");
    card.classList.add("card");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    // Create an anchor tag for the Twitter username with the link to the user's profile
    const usernameLink = document.createElement("a");
    usernameLink.href = `https://twitter.com/${user.twitterUsername}`;
    usernameLink.textContent = user.twitterName;
    usernameLink.target = "_blank"; // Open link in a new tab

    cardBody.appendChild(usernameLink);

    // Append the user display price to userInfo
    const displayPrice = document.createElement("div");
    displayPrice.textContent = `Ξ ${(user.displayPrice / 1e18).toFixed(2)}`;
    
    cardBody.appendChild(displayPrice);

    card.appendChild(cardBody);
    userCard.appendChild(card);

    return userCard;
}

async function fetchUserData(endpoint, userListId) {
    try {
        const userList = document.getElementById(userListId);
        const response = await fetch(`https://prod-api.kosetto.com/lists/${endpoint}`);
        const data = await response.json();
        
        userList.innerHTML = "";

        // Ensure that there are at least 50 users in the list
        const usersToAdd = data.users.slice(0, 50);

        usersToAdd.forEach((user) => {
            const userCard = createUserCard(user);
            userList.appendChild(userCard);
        });

        // Handle the case where there are fewer than 50 users
        if (usersToAdd.length < 50) {
            const remainingUsers = 50 - usersToAdd.length;
            for (let i = 0; i < remainingUsers; i++) {
                // Create empty user cards to fill the gap
                const emptyUserCard = createUserCard({ twitterName: "", displayPrice: 0 });
                userList.appendChild(emptyUserCard);
            }
        }
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
    }
}

async function fetchAllUserData() {
    await fetchUserData("top-by-price", "top-by-price-list");
    await fetchUserData("trending", "trending-list");
}

fetchAllUserData();
setInterval(fetchAllUserData, 5000);
