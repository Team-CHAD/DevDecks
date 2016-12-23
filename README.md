# DevDecks
An open-source, desktop presentation app for developers. Built in Electron with React-Redux/TypeScript.

![Screenshot](https://cloud.githubusercontent.com/assets/19983603/21447068/afc30ec2-c883-11e6-9dbb-16fa8d702f7a.png)

### Installation
- To install the application for use:
  1. download at: www.devdecks.io

- To contribute to Devdecks development:
  1. Create a local copy of devdecks (forked, cloned, or downloaded).
  2. Navigate to the devdecks folder then ```npm install``` the dependencies. This may take a few minutes.
  3. Open the file at ./Node_Modules/@types/node/index.d.ts
  4. Edit line 73 to read: declare var require: any;
  5. To launch the application, run ```npm run dev```. This may take a moment. Leave Terminal open while you are working on devdecks.

### Getting Started
- The two buttons on the top right allow you to add a slide and go into presentation mode.
- To add content to a slide, use the three buttons above the main slide container. Currently text, image, and code content can be added to slide decks.
- Once content is added, it can be moved and resized by dragging.
- When a component is active, options will appear on the right sidebar.
- If no component is selected, options for the current slide will appear, including the ability to reorder and delete the current slide <sup>[KNOWN ISSUE]</sup>.
- Save or open your devdeck files through the menu bar or by pressing ⌘+S or ⌘+O, respectively.

### Known Issues
- Once components are added to the slide, user cannot access current slide options unless user clicks on that slide on the mini-slides thumbnail.
- Undo/redo causes issues with current slide number being out of sync with state when adding/deleting or switching slides (current fix is to restart app) - app still works
- It takes more ‘undo’ action calls than should be necessary to undo an action. This is because the undo function is listening to more than just the actions that render a visible difference on the document

### User Feedback
[Report bugs or request features](https://goo.gl/forms/W3b5t1DeYldvA8dO2) email: chad.devdecks@gmail.com  Your feedback will be greatly appreciated!
