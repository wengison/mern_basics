import {useState} from 'react'

export default function Form(props) {
    const [name, setName] = useState('')
    const [mail, setMail] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value; //or just use states: name,mail
        const sendingObject = {
            name: name,
            email: email
        }
        if(name && email) {
            const response = await fetch('http://localhost:3001/api/routes', {
                method: 'POST',
                body: JSON.stringify(sendingObject),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()
            console.log(`User ${name} was added :)`);
            setName('');
            setMail('');
            props.value.myfunction()
        } else {
            console.log("You have to fill in all information");
        }
    }

    return (
        
        <form className="user-form" onSubmit={handleSubmit} >
            <h2>Registration</h2>
            <label htmlFor='name'>Name</label>
            <input 
            type="text" 
            name="name"
            onChange={(e)=>setName(e.target.value)}
            value={name}
            />
            <label htmlFor="email">Email</label>
            <input 
            type="text" 
            name="email"
            onChange={(e)=>setMail(e.target.value)}
            value={mail}
            />
            <button>Add User</button>
            <h6>After submitting the data-form will send to server and stored in the database.</h6>
        </form>
    )
}   