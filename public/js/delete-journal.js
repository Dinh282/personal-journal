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
  
const editJournal = async () => {
   // Extract the journal ID from the current URL
  const url = window.location.href;
  const journalId = url.substring(url.lastIndexOf('/') + 1);

  // Fetch the current journal data from the server
  try {
    const response = await fetch(`/api/journals/view/${journalId}`);
    if (response.ok) {
      const journalData = await response.json();

      // Get the updated journal title and description from user input
      const newTitle = prompt('Enter the new journal title:', journalData.title);
      const newDescription = prompt('Enter the new journal description:', journalData.description);

      // Send a request to update the journal data on the server
      const updateResponse = await fetch(`/api/journals/${journalId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
        }),
      });

      if (updateResponse.ok) {
        // Journal updated successfully, redirect to the updated journal view
        window.location.reload(); // Replace this with the desired URL or page refresh
      } else {
        const { message } = await updateResponse.json();
        console.error(message);
      }
    } else {
      console.error('Failed to fetch journal data');
    }
  } catch (err) {
    console.error(err);
  }
  };

  document
  .querySelector('#edit-journal-btn')
  .addEventListener('click', editJournal);


  document
    .querySelector('#delete-journal-btn')
    .addEventListener('click', deleteJournal);