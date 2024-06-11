// Listen for messages from the extension.
chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    // Check if the action in the request is "like".
    if (request.action === "like") {
        // Get the number of likes and comments from the request.
        let likes = request.likes
        let comments = request.comments

        // Initialize a counter to keep track of processed posts.

        let counter = 0
        // Select all the like buttons on the page.
        var likeButton = document.querySelectorAll("button.react-button__trigger[aria-label='React Like']")
        // Loop until the desired number of likes is reached.
        while (counter - 1 < likes) {
            console.log(likeButton)

            // If there are not enough like buttons, scroll down and recheck
            if (likeButton.length - 1 < counter) {
                window.scroll({ left: 0, top: 2000 * likes, behavior: "smooth" })
                await new Promise(r => setTimeout(r, 2000));
                likeButton = document.querySelectorAll("button.react-button__trigger[aria-label='React Like']")

            }
            else {
                // Scroll the like button into view and click it.
                likeButton[counter].scrollIntoView({ behavior: "smooth" })
                await new Promise(r => setTimeout(r, 1000));

                likeButton[counter].click();
                // Increment the counter to process the next post.
                counter++;
            }
        }

        // Reset the counter for commenting.
        counter = 0;

        // Select all the comment buttons and comment forms on the page.
        var commentButton = document.querySelectorAll("button[id*='feed-shared-social-action-bar-comment']")
        var commentForms = document.querySelectorAll("form.comments-comment-box__form")

        // Loop until the desired number of comments is reached.
        while (counter < comments) {
            // If there are not enough comment buttons, scroll down and recheck.
            if (commentButton.length - 1 < counter) {
                window.scroll({ left: 0, top: 2000 * counter, behavior: "smooth" })
                await new Promise(r => setTimeout(r, 1000));
                commentButton = document.querySelectorAll("button[id*='feed-shared-social-action-bar-comment']")

            }

            // If there are not enough comment forms, click the comment button to load more forms.
            if (commentForms.length - 1 < counter) {
                commentButton[counter].click()
                await new Promise(r => setTimeout(r, 1000));
                commentForms = document.querySelectorAll("form.comments-comment-box__form")
            }
            else {

                // Find the text input for the comment and set its value.
                const commentText = commentForms[counter].querySelector("p")
                commentText.innerText = "CFBR"
                commentText.scrollIntoView({ behavior: "smooth" })
                await new Promise(r => setTimeout(r, 2000));

                // Find and click the submit button for the comment.
                var submitButton = document.querySelectorAll("button.comments-comment-box__submit-button")[0]
                submitButton.click()
                console.log(submitButton)
                await new Promise(r => setTimeout(r, 3000));

                // Increment the counter to process the next comment.
                counter++;
            }
        }
    }

    // Return true to indicate that the response will be sent asynchronously.
    return true
})