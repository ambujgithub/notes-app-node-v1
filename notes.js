const fs = require('fs')
const chalk = require('chalk')

const readNote = (title) => {
    const notes = loadNotes()
    const foundNote = notes.find(note => note.title === title)
    if(foundNote)
    {
        console.log(chalk.inverse(foundNote.title))
        console.log(foundNote.body)
    }
    else 
    {
        console.log(chalk.red.inverse('No note found by that Title!!!'))
    }
}

const addNote = (title,body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)

    if(!duplicateNote) {
        notes.push({
            title,body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('Note added successfully!'))
    }
    else {
        console.log(chalk.red.inverse('A note with this title already exists!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter(note => note.title !== title)
    if(notes.length > notesToKeep.length) {
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse("Note removed!"))
    }
    else {
        console.log(chalk.red.inverse("No note found!"))
    }
    
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.green.inverse('Your Notes:'))
    notes.forEach(note=>console.log(note.title))
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJson)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch (error) {
        return []
    }
    
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}