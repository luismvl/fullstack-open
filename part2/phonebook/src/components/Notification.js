import React from 'react'

const Notification = ({ message, type }) => {
    if (!message) {
        return null
    }

    const styles = {
        backgroundColor: 'lightgrey',
        padding: 10,
        fontSize: 20,
        borderRadius: 5,
        color: 'DarkSlateGrey',
        border: '3px solid DarkSlateGrey',
        marginBottom: 16,
    }
    if (type === 'succes') {
        styles.color = 'green'
        styles.borderColor = 'green'
    }
    if (type === 'error') {
        styles.color = 'red'
        styles.borderColor = 'red'
    }


    return (
        <div style={styles}>
            {message}
        </div>
    )
}

export default Notification