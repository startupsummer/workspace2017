## Lecture

http://slides.com/evgenyshilin/deck-1

## Lecture task

The main objective of the task is to learn fundamental docker commands and workflows

Mandatory task:

1. Write dockerfile for application (Look at simple app folder - file `app.js`)
2. Run two containers on localhost which will work on two different ports. The first one should be `3333`, the second is` 3334`.
3. Make sure that both apps are available through your browser
4. Create a new file named `result` where you will paste some info for tasks below.
5. Paste a list of containers that is running on your machine into it
6. Replace file `app.js` which is placed INSIDE of your container on file` replacement.js`. (Editing this file is forbidden) (You should leave the same name as it was before - app.js)
7. Paste command which you used to complete 6 step into `result`
8. Restart container
9. Capture logs of restarted container and paste it into `result` file
10. Proceed to the first container and create empty new file `test-message.js` IN THE SAME DIRECTORY where` app.js` file is located
11. Paste into `result` commands which you used to complete 6 step
12. Restart the container
13. Capture logs of restarted container and paste it into `result` file.

To make sure that you successfully completed the task:

Latest logs will have the message that you have successfully completed the task and your personal ID.

### Once finished ..

Create pull request with only one file `result`.
