// import { createPopper } from '@popperjs/core';


const newJournalPageHandler = async event => {
    event.preventDefault();

    
    //Here we are extracting the journal Id from the URL. 
    const url = window.location.href;
    const journalId = url.substring(url.lastIndexOf('/') + 1);


     try{
        
        const response = await fetch(`/api/new-page/${journalId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },

          });
          
          if (response.ok) {
            location.reload()
          }
        } catch (error) {
          console.error(error);
        }
      }

const addNewPageButtons = document.querySelectorAll('.add-new-page');

addNewPageButtons.forEach(button => {
  button.addEventListener('click', newJournalPageHandler);
});




    const deleteJournalPageHandler = async event => {

        const pageId = event.target.closest('.page').dataset.pageId;

        try {
          // Send a DELETE request to the server to delete the page
          const response = await fetch(`/api/delete-journal-page/${pageId}`, {
            method: 'DELETE',
            // Add any required headers or authentication tokens
          });
      
          if (response.ok) {
            // Page deletion was successful
            // Perform any necessary UI updates or page refresh
            console.log('Page deleted successfully');
            window.location.reload();
          } else {
            // Page deletion failed
            console.log('Failed to delete page');
          }
        } catch (error) {
          // An error occurred during the fetch request
          console.log('Error deleting page:', error);
        }


    }


const deleteButtons = document.querySelectorAll('.del-page-btn');
    
deleteButtons.forEach(button => {
    button.addEventListener('click', deleteJournalPageHandler);
});




const editJournalPageHandler = async event => {
  const pageId = event.target.closest('.page').dataset.pageId;
  
  // Get the updated title and content values from the elements
  const title = event.target.closest('.page').querySelector('h1 span').textContent;
  const contentElement = event.target.closest('.page').querySelector('p span');
  const content = contentElement ? contentElement.textContent : '';

  try {
    // Send a PUT request to the server to update the page
    const response = await fetch(`/api/edit-journal-page/${pageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content })
    });

    if (response.ok) {
      console.log('Page edited successfully');
      // window.location.reload();
      // Add blinking effect and display message
      const saveButton = event.target;
      saveButton.disabled = true;
      const blinkInterval = setInterval(() => {
        saveButton.classList.toggle('blink');
      }, 500);
      saveButton.textContent = ' Edits Saved!';
      
      setTimeout(() => {
        clearInterval(blinkInterval);
        saveButton.classList.remove('blink');
        saveButton.disabled = false;
        saveButton.textContent = '     ';
      }, 2000);

    } else {
      console.log('Failed to edit page');
    }
  } catch (error) {
    console.log('Error editing page:', error);
  }
};

const editButtons = document.querySelectorAll('.save-btn');

editButtons.forEach(button => {
  button.addEventListener('click', editJournalPageHandler);
});





//For editable text event of title and content of journal page
document.addEventListener('click', function (event) {
  const editableText = event.target.closest('.editable-text');
  if (editableText) {
    const input = document.createElement('input');
    input.value = editableText.textContent;
    editableText.replaceWith(input);
    input.focus();

    input.addEventListener('blur', function () {
      const newText = input.value;
      const newSpan = document.createElement('span');
      newSpan.className = 'editable-text';
      newSpan.textContent = newText;

        input.parentNode.replaceChild(newSpan, input);
    

    });
  }
});