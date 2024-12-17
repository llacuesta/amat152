# AMAT 152 Project

## How to Run

### Prerequesites:
1. This project is built using React and Express, so Node JS is required. Node JS could be downloaded [here](https://nodejs.org/en).
2. A terminal.
    - For Windows 11, open the terminal app by searching it from the start menu.
    - For macos, open the terminal app by finding it using Spotlight.
3. The zip file of this project.

### Running the Program
1. Extract this zip and take note of the location.
2. Open two instances of terminal.
3. Copy the path of the folder.
    - For Windows, hold Shift and right-click the file or folder, then select "Copy as Path" from the context menu.
    - For macos, right-click the folder and the hold option. Select copy as pathname.
4. On both instances of terminal, go to the directory of the folder using:
    ```
    cd <FOLDER_PATH>
    ```
5. On the first instance of terminal, enter the following command:
    ```
    cd frontend
    ```
6. On the second instance of the terminal, enter the following command:
    ```
    cd backend
    ```
7. Run this command on both instances of terminal:
    ```
    npm i
    ```
8. On the frontend terminal, enter this command:
    ```
    npm run dev
    ```
    - The output of the terminal should be:
        ```
        > frontend@0.0.0 dev
        > vite


        VITE v6.0.1  ready in 241 ms

        ➜  Local:   http://localhost:5173/
        ➜  Network: use --host to expose
        ➜  press h + enter to show help
        ```
9. On the backend terminal, enter this command:
    ```
    node index.js
    ```
    - The output of the terminal should be:
        ```
        Server listening at port
        ```
10. Go to these website on your browser to open the app:
    ```
    http://localhost:5173/
    ```

### Notes
- This application works best in desktop mode, as mobile view is not tested yet.
- If the application becomes stuck, press `CTRL-C` on both terminal and run step 8 again.
