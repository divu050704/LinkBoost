window.onload = () => {
    const button = document.getElementById("retrieve-title-button");
    button.addEventListener("click", async function () {

        const likes = document.getElementById("likes").value
        const comments = document.getElementById("comment").value
        if (likes !== "" && comments !== "") {
            chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                var activeTab = tabs[0];
                chrome.tabs.sendMessage(activeTab.id, { action: "like", likes: likes, comments: comments });
            });
        }
        else{
            document.getElementById("error").innerHTML = "All fields are required"
        }
    })
}