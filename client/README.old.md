# Full CRUD part two —— Finishing your Express API and Building your Front End

>Note: This exercise is the second step in a two part exercise. You will need to build upon the code that you completed in [part 1](https://git.generalassemb.ly/sei-nyc-dinosaurs/express-full-crud-exercise).

Oh boy! You've made a working API that that can listen for show and index `.get()` requests, and now you get to add three more routes AND build a front end! 

![](https://i.giphy.com/media/i2dE5VvBNxBw4/giphy.webp)

Yahoo! Let's get started!

## Finishing Express
So far, we have 2 of the 5 endpoints we need to set up in order to have full CRUD. We have the following still remaining:
1. Create —— `'/characters'`
2. Update —— `'/characters/:id'`
3. Delete —— `'/characters/:id'`

Using the conventions that we covered in our [Express CRUD Routes lesson](https://git.generalassemb.ly/sei-nyc-dinosaurs/express-react-crud-backend), add these routes to your API, and build out the logic so that they `res.json()` the correct data back to the front end.

Similar to the exercise in that lesson, if you'd like, you can use Postman to test these routes and make sure they're successful. If you do so, keep in mind that the Character Model in this app has a slightly different column structure than the Animal Model from that lesson, so when you do Post and Update requests in Postman, you'll have to use the following syntax for the body:

```js
  "name": "example",
  "image_url": "example",
  "fun_fact": "example",
  "quote": "example"
```

Testing your routes with Postman isn't required, so if you're having trouble with Postman it's okay to move forward. That said, if you don't test at this point, you won't know if these endpoints are working until you hit them from the front end.

Speaking of front ends, let's make one!

## Building a CRUD Front End
### Getting Started
1. Fork and clone this repository
2. `cd` into your cloned repository and turn it into a React app with `npx create-react-app .` **<—— NOTICE THE DOT
3. Add axios and React router with `npm install axios react-router-dom`
4. Open your app in VS Code with `code .`
5. Run your front end server with `npm start`

>Note: In order for your crud app to work, you'll need BOTH your back end and front end server running at the same time. When you do this, you **must** turn on your back end server first.

>Note: If your computer runs slowly when running two servers, it's okay to turn off the backend server for now. Just turn it on later when you're actually testing your `axios` requests.

6. Go to the `index.js` file, import `react-router-dom`, and wrap the `<App />` with `<Router>` components.
7. Get rid of the default code in App.js and App.css
8. In `App.js`, turn the App component into a class component.
9. Import Link and Route to App.js
10. Import axios to App.js

11. Aside from App.js, your finished app will have four components:
- CharacterList.jsx (this will serve as the home page)
- CharacterProfile.jsx
- CharacterCreate.jsx
- CharacterUpdate.jsx

Create a folder inside of `src` called `components` and add each of these to it.

12. Import these four components to App.js

### App.js
Your parent component `<App />` should have the following initial state in its constructor function:

```js
this.state = {
  characters: [],
  character: null
  }
```

Our React app will eventually need to store `formData` in state, too; however, we're going to do that a little differently here than we've done it in the past. For now, let's keep it simple.

The layout and functionality of App.js should be similar to the layout and functionality in [The Office homework](https://git.generalassemb.ly/sei-nyc-dinosaurs/express-react-the-office-exercise), with just a few changes.

Our render function in App.js will need the following layout:

```js
render() {
  return (
    <div className="app">
    
      <header>
        <Link to="/">
          <h1>My Favorite Characters</h1>
        </Link>
      </header>
      
      <main>
      
        {/* Set up a Route that renders the CharacterList component as the home page */}

        {/* Set up a Route that renders the CharacterProfile component */}
        
        {/* Set up a Route that renders the CharacterCreate component */}
        
        {/* Set up a Route that renders the CharacterUpdate component */}

      </main>
      
      <footer>
        <p>&copy; 2019 &mdash; Brian Danger Flynn</p>
      </footer>
      
    </div>
  );
}
```

### Hitting our First Endpoint
Let's get started by hitting our index endpoint to get the full list of characters from our API. In App.js, write a `async componentDidMount()` function that hits `http://localhost:3000/characters` and stores the response to a variable called `const response`.

Make sure to `console.log()` the response and explore the response object. Find the data that you need (the list of characters) and save that to a variable called `characters`. Use `this.setState()` to update the characters in your state.

Then, set up the `<Route />` to CharacterList. This should be your home page, so the path should be `exact "/"`. In the `render` function of that Route, make sure to pass your characters as props with `characters = this.state.characters`. 

#### Rendering our Characters
Open up the CharacterList component. This component should be a **functional** component that accepts `(props)`. You'll need to import Link from react-router-dom.

```js
import React from 'react';
import { Link } from 'react-router-dom';

export default function CharacterList(props) {
  return (
    <div id="character-list">
    
      // map through your characters here and render them on the screen.

    </div>
  )
}
```

Each character should be mapped with the following structure:
- They should be wrapped in a div with the className "character"
- They should display the image of the character
- They should display the name of the character
- They should have a button that says "Profile"
  - This button needs to have an id equal to the character's id
  - This button needs to have an `onClick` event listener. Call the function that it fires `props.handleClick`. We'll need to go back to App.js and define that funciton next.

Similar to The Office homework, you'll want to wrap the profile button with Link tags that link to "/profile". 

>Note: The links on our front end are NOT related to the endpoints on our backend. Those endpoints are ONLY listening for axios calls.

#### handleClick
We just gave the buttons in our CharactersList a function called `handleClick` that we haven't actually defined yet. This function should fire off an axios call that gives us a specific character to see as we're linked to the CharacterProfile page. Let's set that up in App.js.

1. Make sure it's an asynchronous function.
2. We need to know which button you clicked on, so you'll want to use the event object in your function and use `event.target.id` to check the id number of the button you just clicked on.
3. This function should do an axios call to your show page at `http://localhost:3000/employees/${id}`, using that id number that you just grabbed.
4. Use the response from that axios call to update the `character` in your state with `this.setState()`.
5. Pass this function as props to CharacterList as `this.handleClick`

Save everything and take a look at your app in the browser. When you're at your home page, you should be seeing this character data rendered to the screen.

Great! Let's move on to our CharacterProfile component.

### CharacterProfile
If you haven't already, inside of the `<main>` element of App.js, add a `<Route>` with the path `/profile` that renders `<CharacterProfile />`. Make sure to the character retrieved by your click event here as `this.state.character`.

This component should be a **functional** component that accepts `(props)`. 

In this function, you'll want to render the following:
- A div with the className "profile"
- The character image
- The character's name in an `<h2>`
- The character's quote and fun fact in `<p>` tags.

You'll have to use conditional rendering here as there will be a millisecond when this page loads where the props haven't yet passed. Check to see if `props.character` exists. If it does, render everything.

We're going to add more here, but let's pause for now and head back to App.js to work on our `create` endpoint.

### Create
In the state for App.js, add formData:

```js
this.state = {
  characters: [],
  character: null,
  formData: {
      name: "",
      image_url: "",
      quote: "",
      fun_fact: ""
    }
  }
```

Add a link in the header of App.js that goes to "/create":

```js
<header>
  <Link to="/">
    <h1>My Favorite Characters</h1>
  </Link>
  <Link to="/create">Add Character</Link>
</header>
```

Next, add a `<Route path="/create" render={()=> <CharacterCreate /> } />` and pass it `this.state.formData`.

### CharacterCreate
This component should be a **functional component**. We'll want to set it up like this:

```js
import React from 'react';

export default function CharacterCreate (props) {
  return (
    <form onSubmit={props.handleSubmit} >
      <input name="name" onChange={props.handleChange} />
      <input name="image_url" onChange={props.handleChange} />
      <input name="quote" onChange={props.handleChange} />
      <input name="fun_fact" onChange={props.handleChange} />
      <input type="submit" value="Add Character" />
    </form>
  )
 }
}
```

Notice the `handleSubmit` and `handleChange` functions. **You'll need to define these in `App.js`**. Let's start with `handleChange`.

#### handleChange
Set up your `handleChange` function in App.js, between the constructor and render functions. This function is tied to an event listener, so make sure the grab the event. You'll need to use `event.target.name` and `event.target.value` to figure out which input the user is typing in and what they typed.

Then, you'll need to use those values to set state:

```js
this.setState(prevState => ({
  formData: {
    ...prevState.formData,
    [name]: value
  }
}))
```

You can `console.log` your updated `formData` between render and return to make sure everything's working correctly. Once you're confident your `handleChange` is properly tracking what's being entered in your form, you're ready to add your `handleSubmit` function.

#### handleSubmit
This function will need to do an `axios.post` call to your api where it will send the `formData` object you just created to your back end.

1. Make sure `handleSubmit` is an asynchronous function
2. It's attached to an event listener, so make sure to grab the event object as an argument in your function
3. Use that event object to prevent the default form behavior of refreshing the page
4. Use the `const resp = await axios.post(`http://localhost:3000/characters`, formData);` syntax to make your post request
5. Search through the response to find your new character and save that object to a variable called "character".
6. Add that character to state.

```js
this.setState(prevState => ({
  items: [...prevState.characters, character]
}))
```

**Make sure to pass these functions to CharacterCreate in the `<Route>`**

### Delete
Inside of CharacterProfile, add a button that says "delete", give it an id equal to the character's id with, and finally, give it an event listener `onClick={props.handleDelete}`. Also, you'll need to wrap this button with a `<Link to="/">` so that it takes you back to the home page.

Then, go back to App.js to create that function.

This function is tied to an event, so make sure to grab the event as an argument. You'll need to use this to grab that id that you just set with `event.target.id`. Save it to a variable called `const id`. 

Next, send a delete request to your back end with `const resp = await axios.delete(`http://localhost:3000/characters/${id}`);`. Search through the response to find the character that you just deleted, save that character to a variable named "character", and use that value to update state:

```js
this.setState(prevState => ({
  characters: prevState.characters.filter(character => character.id !== id)
})
```

### Style Your App
Use the layout from [The Office homework](https://git.generalassemb.ly/sei-nyc-dinosaurs/express-react-the-office-exercise) as a template to layout your characters list and profile pages. 

Please feel encouraged to add stylings and fonts that fit the theme and style of your book / show / movie / etc.

## Bonus
Add the final component `<CharacterUpdate />`







