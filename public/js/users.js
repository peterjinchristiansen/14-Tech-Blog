$('#registerSubmit').click(() => {
    event.preventDefault()
    fetch('/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: $('#registerUsername').val(),
            password: $('#registerPassword').val(),
            password2: $('#registerPassword2').val()
        })
    }).then(response => {
        return response.json()
    }).then(data => {
        if(data.error) {
            alert(data.error)
            location.reload()
        } else {
            alert(data.success)
            window.location.replace('/dashboard')
        }
    })
})

$('#loginSubmit').click(() => {
    event.preventDefault()
    fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: $('#loginUsername').val(),
            password: $('#loginPassword').val()
        })
    }).then(response => {
        return response.json()
    }).then(data => {
        if(data.error) {
            alert(data.error)
            location.reload()
        } else {
            alert(data.success)
            window.location.replace('/dashboard')
        }
    })
})

$('#logoutSubmit').click(() => {
    event.preventDefault()
    fetch('/api/users/logout', {
        method: 'POST',
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
            window.location.replace('/')
        }
    })
})