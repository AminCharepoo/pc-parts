


document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("addButton");
    const partNameInput = document.getElementById("partName");
    const partPriceInput = document.getElementById("partPrice");
    const partLinkInput = document.getElementById("partLink");
    const auctionLinkInput = document.getElementById("auctionLink");
    

    const buttonsDiv = document.querySelector(".buttons");

    addButton.addEventListener("click", function () {
        console.log("Button Clicked");
        const partName = partNameInput.value;
        const partPrice = partPriceInput.value;
        const partLink = partLinkInput.value;
        const auctionLink = auctionLinkInput.value;

        if (partName && partPrice && partLink && auctionLink) {
            createButton(partName, partPrice, partLink, auctionLink );
            saveToLocalStorage(partName, partPrice, partLink, auctionLink);
            partNameInput.value = "";
            partPriceInput.value = "";
            partLinkInput.value = "";
            auctionLinkInput.value = "";
        }
    });

 
    loadButtonsFromLocalStorage();

    function createButton(partName, partPrice, partLink, auctionLink) {
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "button-container";
        

        const partButton = document.createElement("button");
        partButton.className = "button";
        partButton.textContent = partName + " " + "$" + partPrice;

        const auctionButton = document.createElement("button");
        auctionButton.className = "button";
        auctionButton.textContent = "Auction Link"

        const editButton = document.createElement("button")
        editButton.className = "button edit-button";
        editButton.textContent = "Edit";

        const deleteButton = document.createElement("button");
        deleteButton.style.verticalAlign = "middle";
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";

        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = partName;
        editInput.className = "edit-input";   
        editInput.style.display = "none"; 
        
        const saveButton = document.createElement("button");
        saveButton.className = "button save-button"
        saveButton.textContent = "Save";
        saveButton.style.display = "none"



        partButton.addEventListener("click", function () {
            window.open(partLink, "_blank");
        });

        auctionButton.addEventListener("click", function() {
            window.open(auctionLink, "_blank");
        })

        editButton.addEventListener("click", function () {
            partButton.style.display = "none";
            auctionButton.style.display = "none;";
            editInput.style.display = "none";
            saveButton.style.display = "block";

        });

        saveButton.addEventListener("click", function () {
            const newPartName = editInput.value;
            partName = newPartName;
            partButton.textContent = newPartName + " " + "$" + partPrice;
            partButton.style.display = "block";
            auctionButton.style.display = "block";
            editInput.style.display = "none";
            editInput.style.display = "none";
            saveButton.style.display = "none";
        });

        deleteButton.addEventListener("click", function () {
            buttonContainer.remove();
            removeFromLocalStorage(partName);
        });

        buttonContainer.appendChild(partButton);
        buttonContainer.appendChild(auctionButton)
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);
        buttonContainer.appendChild(editInput);
        buttonContainer.appendChild(saveButton);
        buttonsDiv.appendChild(buttonContainer);
    }

    function saveToLocalStorage(partName, partPrice, partLink) {
        const data = JSON.stringify({ partName, partPrice, partLink });
        localStorage.setItem(partName, data);
    }

    function removeFromLocalStorage(partName) {
        localStorage.removeItem(partName);
    }

    function updateInLocalStorage(partName, newPartName, partPrice, partLink, auctionLink) {
        removeFromLocalStorage(partName);
        saveToLocalStorage(newPartName, partPrice, partLink, auctionLink);
    }

    function loadButtonsFromLocalStorage() {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const data = JSON.parse(localStorage.getItem(key));
            createButton(data.partName, data.partPrice, data.partLink);
        }
    }
});

