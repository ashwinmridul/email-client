# Email Client

This is an email client to display messages separated with categories.
### Dev versions:
  - node: `8.11.3`
  - npm: `5.6.0`
### Installing dependencies
\>`npm install`
### Running dev server
\>`npm start`
### Key features:
   - Getting messages from `JSON` and storing them in `Session Storage` to keep the state.
   - Storing email message types in `listTypes` constant and `reusing` it.
   - Keeping data for each message type in `src/data` folder
   - Using `promises` for get/set flag/set unread/delete messages
   - Landing on the `index route` will redirect it to the first message types route in the list i.e. `inbox` here.
   - Landing on an `invalid route` will display a page with left navigation and a message on the right container.
   - Left navigation will contain message types with number of unread counts next to each type. No count to be shown if all the messages of that category is read.
   - There will be a list of emails for each type which comes next to email types, containing the message subject, body, flag icon and delete icon. 
   - If there are any flagged messages in the list, then only user will get a checkbox to filter on flagged messages.
   - Clicking on delete icon next to a message will move it to deleted folder. If a message in deleted folder is deleted, it will be removed permanently.
   - On clicking a message, it's complete subject and body will appear to the right of it.