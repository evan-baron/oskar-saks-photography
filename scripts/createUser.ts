import "dotenv/config";
import readline from "node:readline";
import bcrypt from "bcryptjs";
import { db } from "../src/lib/db";

type MutableInterface = { _writeToOutput: (text: string) => void };

function prompt(question: string, hidden = false): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    if (hidden) {
      const mutable = rl as unknown as MutableInterface;
      const write = mutable._writeToOutput.bind(rl);
      mutable._writeToOutput = (text) => {
        if (text.startsWith(question)) write(text);
      };
    }
    rl.question(question, (answer) => {
      rl.close();
      if (hidden) process.stdout.write("\n");
      resolve(answer);
    });
  });
}

// Usage: npm run user:create -- [email] [--temporary --password=<temp>]
// --temporary marks the account so the user must choose a new password at first sign-in.
async function main() {
  const args = process.argv.slice(2);
  const flag = (name: string) => args.find((arg) => arg.startsWith(`--${name}=`))?.slice(name.length + 3);
  const temporary = args.includes("--temporary");
  const positional = args.filter((arg) => !arg.startsWith("--"));

  const email = (positional[0] ?? (await prompt("Email: "))).trim().toLowerCase();
  const password = flag("password") ?? (await prompt("Password (min 10 chars): ", true));
  if (!email.includes("@")) throw new Error("Enter a valid email");
  if (!temporary && password.length < 10) throw new Error("Password must be at least 10 characters");

  const passwordHash = await bcrypt.hash(password, 12);
  await db.user.upsert({
    where: { email },
    create: { email, passwordHash, role: "admin", mustChangePassword: temporary },
    update: { passwordHash, role: "admin", mustChangePassword: temporary },
  });
  console.log(`Saved admin user ${email}${temporary ? " (must change password at first sign-in)" : ""}`);
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
