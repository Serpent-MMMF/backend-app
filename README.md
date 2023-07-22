## How to run
0. Copy env file from `.env.example` to `.env` and fill the variables' value
1. Install dependencies
    ```
    npm install
    ```
2. Run Migration
    ```
    npx prisma migrate dev
    ```
    Optionally you can seed the database after that
    ```
    npx prisma db seed
    ```
4. Run the App
    ```
    npm run dev
    ```    
