## Setup

### Clone the Repository

To get started, clone the repository and navigate to the project directory:

  ```sh
  git clone <repository-url>
  cd <repository-directory>
  ```
---
# Steps to Run Backend

1. **Navigate to the Server Folder:**
    ```sh
    cd server
    ```

2.  **Install the dependencies**
    ```sh
    pip install -r requirements.txt
    ``` 

3. **Create a .env file in the root directory of the project and add the following values:**
 
    ```sh
    MONGO_URI=mongodb+srv://vibhashdwivedi96:livesitter@cluster0.1zdfa.mongodb.net/Livesitter?retryWrites=true&w=majority&appName=Cluster0
    ```
4. **Start the server**
    ```sh
    python app.py
    ```
The server will run successfully on localhost `5000`. 

---

# Steps to Run Frontend:

1. **Navigate to the first-assignment Directory:**
    ```sh
    cd client
    ```
2. **Install the necessary dependencies:**
    ```sh
    npm install
    ```

3. **Start the server**
    ```sh
    npm start
    ```
The server will run successfully on localhost `3000`.

## Backend Structutre

- *uploads/*: Directory for storing uploaded files.
- *app.py*: Main entry point for the Flask application.
- *config.py*: Configuration settings for the Flask application, also contains routes
- *db.py*: Database initialization.
- *model.py*: Overlay model and methods for CRUD operations.
- *requirements.txt*: Lists the dependencies for the Flask application



    


