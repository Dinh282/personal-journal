const deleteJournal = async event => {
  //   event.preventDefault();

  //   // Ask for confirmation
  // if (!confirm('Are you sure you want to delete this journal?')) {
  //   return;
  // }


  // // Extract the journal ID from the current URL
  // const url = window.location.href;
  // const journalId = url.substring(url.lastIndexOf('/') + 1);

  // try {
  //   const response = await fetch(`/api/journals/view/${journalId}`, {
  //     method: 'DELETE',
  //   });

  //   if (response.ok) {
  //     // Journal deleted successfully, redirect to a new page
  //     window.location.href = '/journals'; // Replace '/journals' with the desired URL
  //   } else {
  //     const { message } = await response.json();
  //     console.error(message);
  //   }
  // } catch (err) {
  //   console.error(err);
  // }

  event.preventDefault();
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

    const journalId = document.querySelector('.swiper-slide').getAttribute('data-journal-id');
 
     try {
       const response = await fetch(`/api/journals/view/${journalId}`, {
         method: 'DELETE',
       });
 
       if (response.ok) {
         // Journal deleted successfully, redirect to a new page
         window.location.href = '/journals'; // Replace '/journals' with the desired URL
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
    // Extract the journal ID from the current URL
    // const url = window.location.href;
    // const journalId = url.substring(url.lastIndexOf('/') + 1);
    // const title = prompt('Enter the new journal title:');
    // const content = prompt('Enter the new journal content:');

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
        // Journal updated successfully, redirect to a new page
        window.location.reload(); // Replace '/journals' with the desired URL
      } else {
        const { message } = await response.json();
        console.error(message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // document
  // .querySelector('#edit-journal-btn')
  // .addEventListener('click', editJournal);

  
document
.querySelector('#edit-journal-form')
.addEventListener('submit', editJournal);

document
.querySelector('.delete-journal-btn')
.addEventListener('click', deleteJournal);

