const deleteJournal = async event => {
    event.preventDefault();

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
  

  document
    .querySelector('#delete-journal-btn')
    .addEventListener('click', deleteJournal);