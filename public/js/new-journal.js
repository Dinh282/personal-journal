const newJournalFormHandler = async event => {
    event.preventDefault();
    const journalTitle = document.querySelector('#journal-title').value.trim();
    const journalDesc = document.querySelector('#journal-desc').value.trim();
  
    if (journalTitle && journalDesc) {
      const response = await fetch('/api/journals', {
        method: 'POST',
        body: JSON.stringify({ title: journalTitle, content: journalDesc,}),
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
    .querySelector('.new-journal-form')
    .addEventListener('submit', newJournalFormHandler);