const commentSubmit = (id) => {
    event.preventDefault()
    fetch('/api/comments/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            postID: id,
            content: $(`#commentContent${id}`).val()
        })
    }).then(response => {
        return response.json()
    }).then(data => {
        if(data.error) {
            alert(data.error)
        } else {
            alert(data.success)
            location.reload()
        }
    })
}