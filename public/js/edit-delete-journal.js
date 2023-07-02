const deleteJournal = async event => {
    event.preventDefault();

    // Ask for confirmation
  if (!confirm('Are you sure you want to delete this journal?')) {
    return;
  }


  // Extract the journal ID from the current URL
  const url = window.location.href;
  const journalId = url.substring(url.lastIndexOf('/') + 1);

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
};
  
const editJournal = async event => {
  // Extract the journal ID from the current URL
  const url = window.location.href;
  const journalId = url.substring(url.lastIndexOf('/') + 1);
   // Get the updated title and content values from the elements
   const title = event.target.closest('.cover').querySelector('h1 span').textContent;
   const contentElement = event.target.closest('.cover').querySelector('h3 span');
   const content = contentElement ? contentElement.textContent : '';


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
      console.log('Journal edited successfully');
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
      console.log('Failed to edit journal');
    }
  } catch (error) {
    console.log('Error editing journal:', error);
  }
};

const saveButton = document.getElementById('save-button');
saveButton.addEventListener('click', editJournal);

  document
    .querySelector('#delete-journal-btn')
    .addEventListener('click', deleteJournal);