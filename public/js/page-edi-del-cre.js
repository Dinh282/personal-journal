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