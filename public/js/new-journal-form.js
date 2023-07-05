const newJournalFormHandler = async event => {
  event.preventDefault();
  const journalTitle = document.querySelector('#journal-title').value.trim();
  const journalDesc = document.querySelector('#journal-desc').value.trim();

  if (journalTitle && journalDesc) {
    const response = await fetch('/api/journals', {
      method: 'POST',
      body: JSON.stringify({ title: journalTitle, content: journalDesc }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/journals');
    } else {
      const { message } = await response.json();
      // eslint-disable-next-line no-undef
      showAlert({ target: 'title-alert', message, type: 'danger' });
    }
  }
};

document
  .querySelector('#new-journal-form')
  .addEventListener('submit', newJournalFormHandler);

// const deleteJournal = async event => {
//   event.preventDefault();

//   // Extract the journal ID from the current URL
//   const url = window.location.href;
//   const journalId = url.substring(url.lastIndexOf('/') + 1);

//   try {
//     const response = await fetch(`/api/journals/view/${journalId}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       // Journal deleted successfully, redirect to a new page
//       window.location.href = '/journals'; // Replace '/journals' with the desired URL
//     } else {
//       const { message } = await response.json();
//       console.error(message);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

// document
//   .querySelector('#delete-journal-btn')
//   .addEventListener('click', deleteJournal);
