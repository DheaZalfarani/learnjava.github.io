const express = require("express");
const path = require("path");
const app = express();

// Menyajikan konten statis dari folder 'assets' yang berada di luar proyek
app.use(express.static(path.join(__dirname, '../assets')));

app.get("/", function (req, res) {
  // Mengirimkan file HTML saat rute root diakses
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get("/getDataFromAnotherServer", async (req, res) => {
  try {
    const response = await axios.get("http://127.0.0.1:5500/someDataEndpoint");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const bodyP = require("body-parser");
const compiler = require("compilex");
const options = { stats: true };
compiler.init(options);
app.use(bodyP.json());
app.use(
  "/codemirror-5.65.9",
  express.static("C:/laragon/www/learnjava.github.io/code/codemirror-5.65.16")
);
app.get("/", function (req, res) {
  compiler.flush(function () {
    console.log("deleted");
  });
  res.sendFile("C:/laragon/www/learnjava.github.io/code/index.html");
});
app.post("/compile", function (req, res) {
  var code = req.body.code;
  var input = req.body.input;
  var lang = req.body.lang;
  try {
    if (lang == "Cpp") {
      if (!input) {
        var envData = {
          OS: "windows",
          cmd: "g++",
          options: { timeout: 10000 },
        }; // (uses g++ command to compile )
        compiler.compileCPP(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      } else {
        var envData = {
          OS: "windows",
          cmd: "g++",
          options: { timeout: 10000 },
        }; // (uses g++ command to compile )
        compiler.compileCPPWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      }
    } else if (lang == "Java") {
      if (!input) {
        var envData = { OS: "windows" };
        compiler.compileJava(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      } else {
        var envData = { OS: "windows" };
        compiler.compileJavaWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      }
    } else if (lang == "Python") {
      if (!input) {
        var envData = { OS: "windows" };
        compiler.compilePython(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      } else {
        var envData = { OS: "windows" };
        compiler.compilePythonWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      }
    }
  } catch (e) {
    console.log("error");
  }
});

app.listen(8000, () => {
  console.log('Server running on port 8000');
});
