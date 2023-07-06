const deleteJournal = async event => {

  event.preventDefault();
  // Create a Bootstrap modal
  const modal = new bootstrap.Modal(
    document.getElementById('confirmationModal')
  );

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
   
    const journalId = document.querySelector('.swiper-slide').getAttribute('data-journal-id');
 
     try {
       const response = await fetch(`/api/journals/view/${journalId}`, {
         method: 'DELETE',
       });
 
       if (response.ok) {
        
         window.location.href = '/journals'; 
       } else {
         const { message } = await response.json();
         console.error(message);
       }
     } catch (err) {
       console.error(err);
     }
 
     // Hide the modal
     modal.hide();
   });


};

const editJournal = async () => {
 
    const journalId = document.querySelector('.swiper-slide').getAttribute('data-journal-id');
  
    const title = document.querySelector('#edit-journal-title').value.trim();
    const content = document.querySelector('#edit-journal-desc').value.trim();

    // Prepare the updated journal data
    const updatedJournalData = {
      title: title,
      content: content,
    };
  
    // Fetch the current journal data from the server
    try {
      const response = await fetch(`/api/journals/view/${journalId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedJournalData)
      });
  
      if (response.ok) {
      
        window.location.reload(); 
      } else {
        const { message } = await response.json();
        console.error(message);
      }
    } catch (err) {
      console.error(err);
    }
  };

document
  .querySelector('#edit-journal-form')
  .addEventListener('submit', editJournal);

document
.querySelector('.delete-journal-btn')
.addEventListener('click', deleteJournal);

