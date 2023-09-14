function createUserCard(user) {
    const userCard = document.createElement("div");
    userCard.classList.add("col-md-4", "offset-md-4");

    const card = document.createElement("div");
    card.classList.add("card");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const userInfo = document.createElement("div");
    userInfo.classList.add("card-text");
    userInfo.textContent = `${user.twitterName} Ξ ${(
        user.displayPrice / 1e18
    ).toFixed(2)}`;

    cardBody.appendChild(userInfo);

    card.appendChild(cardBody);

    userCard.appendChild(card);

    return userCard;
}

function fetchUserData() {
    const userList = document.getElementById("user-list");

    fetch("https://prod-api.kosetto.com/lists/top-by-price")
        .then((response) => response.json())
        .then((data) => {
            userList.innerHTML = "";

            data.users.forEach((user) => {
                const userCard = createUserCard(user);
                userList.appendChild(userCard);
            });
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

fetchUserData();
setInterval(fetchUserData, 5000);
