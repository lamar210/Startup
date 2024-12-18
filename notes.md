 # Intro
 ## Basic info:

- check the status often when using the repository 

- (git pull) & (git push) -- updating the repository & Github

- To fix diverging errors:
1) Try to pull/push info
2) after you get the error, combine both results
3) git push
4) check status again

Website is going to be dedicated to journaling, browsing and saving inspiring quotes of choice, and a section for a short survey regarding the user's mood swings and reasons for them.

HTML notes: [View Notes](HTML_notes.md)

See [Simon code](simon-html) for HTML notes application

HTML startup code notes:

- hrefs for clicks with links to different pages

- Buttons are for implmentations on the same page (you can add the one click feature so it shows the user and console there's something to be clicked)

- (br) is to break up the lines

- Some styling can be done through HTML like font size and color of the text

- Spans are used for sliders

- For each page you need a different file

- When making labels, for checkboxes for example, make sure to include the type, name and value with label commands

- ^ For buttons: Type, aria-label, and title

- Placeholders in textareas are the text shown in the box before user types any input

- (ol) is an ordered list

- (ul) is an unorderd list

- (li) is used to list items (whether ordered or not)

- Can link pages through html

- In order for database to save input - (form action="your_server_endpoint_here" method="post") shouled be used

- git add * adds all files needed (wish I knew this before) 

##Final notes:
1. Default Ports
HTTP: 80
HTTPS: 443
SSH: 22
2. HTTP Status Codes
300 Range (Redirection): The client must take additional action to complete the request. Example: 301 Moved Permanently.
400 Range (Client Error): Indicates issues with the client's request. Example: 404 Not Found.
500 Range (Server Error): The server encountered an issue fulfilling the request. Example: 500 Internal Server Error.
3. HTTP Header Content-Type
The Content-Type header specifies the media type of the resource (e.g., application/json, text/html, image/png). It allows the client and server to interpret the format of the data.

4. Cookie Types
Secure Cookie: Ensures the cookie is sent only over HTTPS.
HttpOnly Cookie: Prevents client-side scripts (e.g., JavaScript) from accessing the cookie.
SameSite Cookie: Controls whether the cookie is sent with cross-site requests:
Strict: Only sent with same-origin requests.
Lax: Sent with same-origin and some cross-site GET requests.
None: Sent with all requests but requires Secure.
Reference

5. Express Middleware - Console Log
For an HTTP GET request to /api/document, the middleware will output:

plaintext
Copy code
GET /api/document
(Assuming middleware uses console.log(req.method, req.path)).

6. Express Fetch Request
The front end fetch request will return the response provided by the backend Express route handler. For example, if Express sends JSON:

javascript
Copy code
res.json({ message: "Success" });
The fetch will return:

json
Copy code
{ "message": "Success" }
7. MongoDB Query
Given:

json
Copy code
{ name: "Mark" }
MongoDB will return all documents in the collection where the name field matches "Mark".

8. Storing User Passwords
User passwords should never be stored in plaintext. Use:

Hashing: Use a secure hashing algorithm like bcrypt.
Salting: Add a unique salt to each password before hashing.
Example with bcrypt:

javascript
Copy code
const hashedPassword = await bcrypt.hash(password, saltRounds);
9. WebSocket Console Log
The front-end console log will depend on the back-end WebSocket events. Typically:

If the server sends a message:
javascript
Copy code
console.log(event.data); // Logs the message content from the server
10. WebSocket Protocol
The WebSocket protocol provides full-duplex communication over a single, long-lived TCP connection. It enables real-time, low-latency communication between a client and server.

11. Acronyms
JSX: JavaScript XML
JS: JavaScript
AWS: Amazon Web Services
NPM: Node Package Manager
NVM: Node Version Manager
12. React Component Text Content
The generated text content will depend on the component's implementation and its parameters. For example:

jsx
Copy code
function Greeting({ name }) {
  return <p>Hello, {name}!</p>;
}
If name="Mark", the text will be:

plaintext
Copy code
Hello, Mark!
13. Nested React Components
The output will reflect the combined structure and content of all nested components rendered into the DOM.

14. React useState Hook
The useState Hook allows functional components to:

Define a state variable and an updater function.
Example:

javascript
Copy code
const [count, setCount] = useState(0);
15. React Hooks
Hooks enable functional components to use React features (e.g., state, context, lifecycle).

16. React Hooks Overview
State Hook: useState - Manages state in functional components.
Context Hook: useContext - Accesses context values.
Ref Hook: useRef - Maintains mutable references without causing re-renders.
Effect Hook: useEffect - Performs side effects in components.
Performance Hook: Includes useMemo and useCallback for optimization.
Reference

17. React Router
React Router enables declarative routing for React apps. Statements like "Routes render based on URL" are generally true.

18. package.json File
Defines the project's metadata, dependencies, scripts, and configuration.

Example:

json
Copy code
{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0"
  },
  "scripts": {
    "start": "vite"
  }
}
19. Fetch Function
The fetch function performs network requests and returns a Promise. Example:

javascript
Copy code
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data));
20. Node.js
Node.js is a JavaScript runtime that runs server-side JavaScript using the V8 engine.

21. PM2
PM2 is a process manager for Node.js applications. It ensures apps run continuously and restarts them on crashes.

22. Vite
Vite is a build tool and development server that optimizes modern frontend projects with fast HMR (Hot Module Replacement) and a minimal build process.