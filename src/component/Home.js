import React, { useContext } from 'react';
const Home = () => {
  const context = useContext(contextValue);
  const {notes,setNotes} = context;
  return (
    <>
    <h1>Add a Note</h1>
      <form>
        <div className="mt-4">
          <label for="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" />
        </div>
       
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      <div>
        
      </div>
    </>
  )
}

export default Home
