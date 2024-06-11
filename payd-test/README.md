## Description
- **Summary**: This project creates the interface described for the test. 
![Snapshot_2024-06-11_173441_localhost](https://github.com/atuyabirisi/intern-assessment/assets/99082005/2d38ec83-66e3-49bb-95c4-a12768360381)

## Implementation
- It creates the different components to their folders under `src/components/...` and imports them to the main `App.tsx` file.
- The `createPost.tsx` file implements the creation of new posts, while the `Navbar.tsx` implements a static navbar section for the UI.
- The `Posts.tsx` file imports the `createPost.tsx`, fetches and displays posts from the provided URL while implementing and integrating the search functionality to filter posts.

### **Details**:
  - Fetched and displayed posts from https://jsonplaceholder.typicode.com/posts.
  - Implemented creation of a new post using the same API endpoint.
  - Implement pagination to the list of posts.
  - Added a search input to the Posts section.
  - Modified Posts to filter posts based on the search query.
  - Refactored state management in Posts to support dynamic filtering.
  - Implemented responsive styles for different devices.

## Additional Features
- Implemented a custom theme for the project in `theme.ts`
- Worked with a color scheme of `white`, `darkGreen`, and `amber`.
- Added "Previous" and "Next" buttons to navigate between pages. 
- Implemented a <Spinner /> for the loading state to the posts.
- Displayed a "No posts found" message if filtered post isn't available.

## Visual Changes
![Screenshot_11-6-2024_172232_localhost](https://github.com/atuyabirisi/intern-assessment/assets/99082005/5bbbe84f-6d66-4ebc-9df4-074692f31fb8)
![Screenshot_11-6-2024_172346_localhost](https://github.com/atuyabirisi/intern-assessment/assets/99082005/4af29a75-a5fc-487f-ae28-690215cc8560)
![Screenshot 2024-06-11 at 18-34-56 React App](https://github.com/atuyabirisi/intern-assessment/assets/99082005/2bcd0e0b-761e-4f97-bd11-5ee4738c8dd0)


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
