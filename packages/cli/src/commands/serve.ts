import { Command } from "commander";
import { serve } from "@compument/local-api";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("-p, --port <number>", "port to run server on", "4006")
  .action(async (filename = "notebook.js", options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));

      await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction
      );
      console.log(
        `opened ${filename}, Navigate to http://localhost:${options.port}`
      );
    } catch (err: any) {
      if (err.code === "EADDRINUSE") {
        console.error("port already in use, try a different one");
      } else console.log("here is the problem: ", err.message);
      process.exit(1);
    }
  });
