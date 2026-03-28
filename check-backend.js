const http = require("http");

function checkBackendHealth() {
  return new Promise((resolve) => {
    const req = http.request(
      {
        hostname: "localhost",
        port: 4000,
        path: "/api/health",
        method: "GET",
        timeout: 2000,
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          try {
            const data = JSON.parse(body);
            if (data && data.status === "ok") {
              console.log("The backend is connected");
            } else {
              console.log("The backend is not connected");
            }
          } catch {
            console.log("The backend is not connected");
          }
          resolve();
        });
      }
    );

    req.on("error", () => {
      console.log("The backend is not connected");
      resolve();
    });

    req.on("timeout", () => {
      req.destroy();
      console.log("The backend is not connected");
      resolve();
    });

    req.end();
  });
}

checkBackendHealth().then(() => {
  // Nothing else to do; npm will continue to the next command in the script.
});

