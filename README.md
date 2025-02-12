
## <a name="introduction">🤖 Introduction</a>

Interview test of Everything Green Limited API development.

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- MongoDB
- NextAuth

## <a name="features">🔋 Features</a>

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/ohabdev/everything-green-ltd-interview.git
cd everything-green-ltd-interview
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
NEXTAUTH_SECRET=dfgddffg
MONGODB_URI=
DATABASE_NAME=
JWT_TIMEOUT_DURATION="7 days"
JWT_SECRET=s9df7sd8
```

Replace the placeholder values with your actual credentials. You can obtain these credentials by signing up on [MongoDB](https://www.mongodb.com/). 

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to API the project.

