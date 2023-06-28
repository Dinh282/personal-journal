const newPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#journal-title').value.trim();
    const journalDesc = document.querySelector('#journal-desc').value.trim();
  
    
    // if(!title || !journalDesc){
    //     alert("You must provide a title and content for your post.")
    // }

    if (title && journalDesc) {
      const response = await fetch(`/api/journals`, {
        method: 'POST',
        body: JSON.stringify({ title, content: journalDesc }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/journals');
        
      } else {
        alert('Failed to create a new post');
      }
    }
  };

  document
  .querySelector('.new-post-form')
  .addEventListener('submit', newPostHandler);