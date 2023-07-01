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

   document
    .querySelector('#add-new-page')
    .addEventListener('click', newJournalPageHandler);


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

    // document
    // .querySelector('.del-page-btn')
    // .addEventListener('click', deleteJournalPageHandler);