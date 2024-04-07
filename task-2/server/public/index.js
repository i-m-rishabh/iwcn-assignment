
function Header() {
    return (
        <div className='header'>
            <i className="fa-solid fa-bars"></i>
            <span style={{paddingLeft:'10px'}}>Notes</span>
        </div>
    )
}

function Footer() {
    return (
        <div className='footer'>&copy;rishabh-pandey</div>
    )
}

function NewNote({handleAddNote}){
    const [newNote, setNewNote] = React.useState({title:'', text:''});
    function addNote(){
        if(newNote.title==='' || newNote.text===''){
            alert('empty notes');
            return;
        }
        handleAddNote(newNote);
        setNewNote({title:'', text:''})
    }
    function handleNoteChange(event){
        setNewNote((prev)=>{
            let newNote = {
                ...prev,
                [event.target.name]: event.target.value,
            }
            return newNote;
        })
    }
    return(
        <div className="new-note">
                <input name="title" value={newNote.title || ''} onChange={(event)=>{handleNoteChange(event)}} className='new-note-title' type='text' placeholder="title here"/>
                <input name="text" value={newNote.text || ''} onChange={(event)=>{handleNoteChange(event)}} className="new-note-text" type='text' placeholder="text here"/>
                <button onClick={addNote} className='new-note-button'>New Note</button>
        </div>
    )
}

function Note({ note, onDelete }) {
    return (
        <div className='note'>
            <h1 style={{color:'gray'}}>{note.title}</h1>
            <p>{note.text}</p>
            <h6>{JSON.stringify(note.date)}</h6>
            <div className='delete-button' onClick={()=>{onDelete(note)}}><i class="fa-solid fa-trash"></i></div>
        </div>
    )
}

function NoteApp() {
    const [notes, setNotes] = React.useState([]);
    React.useEffect(()=>{
        fetch('http://localhost:3000/notes')
        .then((response)=>{
            return response.json();
        })
        .then(data=>{
            // console.log(data);
            setNotes(data);
        })
        .catch(err=>{
            console.log('error', err);
        })
    }, []);

    function onAddNote(newNote){
        const {title, text} = newNote;
        fetch('http://localhost:3000/notes', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                text: text,
                date: new Date(),
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response=>{
            return response.json();
        })
        .then(data=>{
            let id = data.id;
            setNotes(prev=>{
                let newNotes = [...prev, {...newNote, id:id, date: new Date()}];
                return newNotes;
            })
        })
        .catch(err=>{
            console.log('error', err);
        })
        
    }
    function onDelete(note){
        // console.log(note);
        fetch(`http://localhost:3000/notes/${note.id}`,{
            method:'DELETE'
        })
        .then(response=>response.json())
        .then(data=>{
            // console.log('response on delete',data);
            setNotes((prev)=>{
                let newNotes = prev.filter((t)=>JSON.stringify(note)!==JSON.stringify(t))
                return newNotes;
            })
        })
        .catch(err=>{
            console.log(err);
        })
        
    }
    return (
        <div className="note-container">
            <div className='new-note-container'>
            <NewNote handleAddNote={onAddNote}/>
            </div>
            <div className='notes-container'>
            {
                notes.map((note) => {
                    return (
                        <Note key={note.id} note={note} onDelete={onDelete}/>
                    )
                })
            }
            </div>
        </div>
    )
}

function App() {
    return (
        <div className='app'>
            <Header />
            <NoteApp />
            <Footer />
        </div>
    )
};

ReactDOM.render(<App />, document.getElementById('root'));

