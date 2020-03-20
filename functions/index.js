const functions = require("firebase-functions");
const admin = require("firebase-admin");
const config = require("config");
const { Storage } = require("@google-cloud/storage");
const os = require("os");
const path = require("path");
const fs = require("fs");
const Busboy = require("busboy");
const spawn = require("child-process-promise").spawn;
const cors = require("cors")({ origin: true });

const firebaseConfig = {
  apiKey: "AIzaSyBu4WsySegXHMpyLFoiXSc2nxWbFtTPzKI",
  authDomain: "trivia-1ca7c.firebaseapp.com",
  databaseURL: "https://trivia-1ca7c.firebaseio.com",
  projectId: "trivia-1ca7c",
  storageBucket: "trivia-1ca7c.appspot.com",
  messagingSenderId: "826447708340",
  appId: "1:826447708340:web:3049f4830bef61d7d497e1",
  measurementId: "G-QMWZGFF5WR"
};

const storage = new Storage(firebaseConfig);

exports.PhotoEdit = functions.storage.object().onFinalize(event => {
  let object = event;
  const bucket = object.bucket;
  const contentType = object.contentType;
  const filePath = object.name;
  console.log("File change detected, executing...");

  if (path.basename(filePath).startsWith("resized-")) {
    console.log("File already changed");
    return;
  }

  const imageBucket = storage.bucket(bucket);
  const tempPath = path.join(os.tmpdir(), path.basename(filePath));
  const metadata = { contentType: contentType };
  // eslint-disable-next-line consistent-return
  return imageBucket
    .file(filePath)
    .download({
      destination: tempPath
    })
    .then(() => {
      return spawn("convert", [tempPath, "-resize", "500x500", tempPath]);
      //   manipulate file here
    })
    .then(() => {
      return imageBucket.upload(tempPath, {
        destination: "resized-" + path.basename(filePath),
        metadata: metadata
      });
    });
});

exports.deleted = functions.storage.object().onDelete(event => {
  console.log(event);
  return;
});

exports.upLoadFile = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== "POST") {
      return res.status(500).json({
        msg: "Not allowed"
      });
    }
    const busboy = new Busboy({ headers: req.headers });
    let uploadData = null;
    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      const filepath = path.join(os.tmpdir(), filename);
      uploadData = { file: filepath, type: mimetype };
      file.pipe(fs.createWriteStream(filepath));
    });
    busboy.on("finish", () => {
      const bucket = storage.bucket("trivia-1ca7c.appspot.com");
      // eslint-disable-next-line promise/catch-or-return
      bucket
        .upload(uploadData.file, {
          uploadType: "media",
          metadata: {
            metadata: {
              contentType: uploadData.type
            }
          }
        })
        // eslint-disable-next-line promise/always-return
        .then(() => {
          // eslint-disable-next-line promise/always-return

          return res.status(200).json({ msg: "It worked" });
        })
        .catch(err => {
          return res.status(500).json({
            error: err
          });
        });
    });
    busboy.end(req.rawBody);
  });
});
