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
  const title = prompt('Enter the new journal title:');
  const content = prompt('Enter the new journal content:');

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
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedJournalData),
    });

    if (response.ok) {
      // Journal updated successfully, redirect to a new page
      window.location.href = '/journals'; // Replace '/journals' with the desired URL
    } else {
      const { message } = await response.json();
      console.error(message);
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
