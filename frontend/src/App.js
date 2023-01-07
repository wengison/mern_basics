import {useState, useEffect} from 'react'
import Form from './components/Form.js';


function App() {

  const [users, setUsers] = useState(null);
  let userId = ''
  let staticName ='';
  let staticMail = '';

  // #0
  const getUsers = async () => {
    const response = await fetch('http://localhost:3001/api/routes')
    const json = await response.json()
    if(response.ok) {
      setUsers(json)
    } else {
      console.log('error')
    }
  }

  // #1
  const editUser = (id) => {
    document.querySelector('.edit-section').style.display = 'flex'
    document.querySelector('.div-users').style.display = 'none'
    document.querySelector('.user-form').style.display = 'none'

    const user = users.filter(user=>user._id == id)
    document.querySelector('#input-edit-name').value = user[0].name
    document.querySelector('#input-edit-mail').value = user[0].email

    userId = id;
    staticName = user[0].name;
    staticMail = user[0].email;
  }

  // #2
  const onClickEditInput = async (e, element) => {
    e.preventDefault()
    element.parentElement.style.display = "none"
    document.querySelector('.div-users').style.display = 'flex'
    document.querySelector('.user-form').style.display = 'flex'

    staticName = document.querySelector('#input-edit-name').value
    staticMail = document.querySelector('#input-edit-mail').value

    if(staticName&&staticMail) {
      await fetch(`http://localhost:3001/api/routes/${userId}`, { 
        method: 'PATCH', 
        body: JSON.stringify({
          name: staticName,
          email: staticMail
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
    getUsers()
  }

  const deleteUser =  async (id) => {
    const user = await fetch(`http://localhost:3001/api/routes/${id}`, { method: 'DELETE' })
    user ? console.log('user with id:',id, 'was deleted :)') : console.log('user not found')
    getUsers()
  }

  useEffect(()=> {
    // const getUsers = async () => {
    //   const response = await fetch('http://localhost:3001/api/routes')
    //   const json = await response.json()
    //   if(response.ok) {
    //     setUsers(json)
    //   } else {
    //     console.log('error')
    //   }
    // }
    getUsers()
  }, [])

  return (
    <div className="App">
      <div className='div-users'>
        <h1>All Users</h1>
        {users && users.map(user=> (
          <div className='user-div' key={user._id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>id: {user._id}</p>
            <button 
              style={{marginRight: "8px"}}
              onClick={()=>editUser(user._id)}
            >edit</button>
            <button
              onClick={()=>deleteUser(user._id)}
            >delete</button>
          </div>
        ))
        }
      </div>
      <Form className="user-form" value={{myfunction: getUsers}} />
      <form className='edit-section'>
        <h1 style={{color: "white"}}>User</h1>
        <input id='input-edit-name' name='editname' placeholder='New name' type='text' />
        <input id='input-edit-mail' name='editmail' placeholder='New e-mail' type='email'/>
        <button onClick={(e)=>onClickEditInput(e, e.target)}>Edit</button>
      </form>
    </div>
  );
}

export default App;
