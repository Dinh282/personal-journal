const newJournalPageHandler = async event => {
  event.preventDefault();

  //Here we are extracting the journal Id from the URL.
  const url = window.location.href;
  const journalId = url.substring(url.lastIndexOf('/') + 1);

  try {
    const response = await fetch(`/api/new-page/${journalId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      location.reload();
    }
  } catch (error) {
    console.error(error);
  }
};

const addNewPageButtons = document.querySelectorAll('.add-new-page');

addNewPageButtons.forEach(button => {
  button.addEventListener('click', newJournalPageHandler);
});

// document
//   .querySelector('.add-new-page')
//   .addEventListener('click', newJournalPageHandler);


  
const deleteJournalPageHandler = async event => {
  // Create a Bootstrap modal
  const modal = new bootstrap.Modal(document.getElementById('confirmationModal'));

  
  // Attach event handler for the cancel button
  const cancelBtn = document.getElementById('cancelDelete');
  cancelBtn.addEventListener('click', () => {
    modal.hide();
  });

  // Attach event handler for the close button (x)
  const closeBtn = document.querySelector('#confirmationModal .close');
  closeBtn.addEventListener('click', () => {
    modal.hide();
  });

// Show the modal
 modal.show();

 // Handle the confirmation
 const confirmBtn = document.getElementById('confirmDelete');
 confirmBtn.addEventListener('click', async () => {
   // Extract the journal ID from the current URL

  //  const url = window.location.href;
  //  const journalId = url.substring(url.lastIndexOf('/') + 1);

  const pageId = document.querySelector('.query-for-page').getAttribute('data-page-id');


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
});//
};

const deleteButtons = document.querySelectorAll('.del-journal-page-btn');

deleteButtons.forEach(button => {
  button.addEventListener('click', deleteJournalPageHandler);
});




const editJournalPageHandler = async event => {

    // Get the data-page-id attribute from the closest swiper-content element
    // const pageId = event.target.closest('.modal-content').querySelector('.swiper-content').getAttribute('data-page-id');
    const pageId = document.querySelector('.query-for-page').getAttribute('data-page-id');
  

    // Get the title and content values from the form
    const title = document.getElementById('edit-journal-page-title').value;
    const content = document.getElementById('edit-journal-page-desc').value;

  
    try {
      // Send a PUT request to the server to update the page
      const response = await fetch(`/api/edit-journal-page/${pageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }), // Pass the updated title and content in the request body
      });
  
      if (response.ok) {
        console.log('Page edited successfully');
        // window.location.reload();
      } else {
        // Page edit failed
        console.log('Failed to edit page');
      }
    } catch (error) {
      // An error occurred during the fetch request
      console.log('Error editing page:', error);
    }

};

document
.querySelector('#edit-journal-page-form')
.addEventListener('submit', editJournalPageHandler);

// document
// .querySelector('.edit-journal-page')
// .addEventListener('click', editJournalPageHandler);