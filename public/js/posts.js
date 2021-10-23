$('#createPostSubmit').click(() => {
    fetch('/api/posts/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: $('#createPostTitle').val(),
            content: $('#createPostContent').val()
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
})

const editSubmit = (id) => {
    event.preventDefault()
    const identify = id.slice(4)
    fetch('/api/posts/edit', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: identify,
            title: $(`#changedTitle${identify}`).val(),
            content: $(`#changedContent${identify}`).val()
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

const deleteSubmit = (id) => {
    event.preventDefault()
    const identify = id.slice(6)
    console.log(identify)
    fetch(`/api/posts/delete/${identify}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
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