import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpge', 'gif', 'pdf'], carpeta = 'uploads') => {

    return new Promise((resolve, reject) => {


        let sampleFile;
        let uploadPath;
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[(nombreCortado.length - 1)];
        const permitidas = extensionesValidas

        if (!permitidas.includes(extension)) {
            res.status(400).json({
                ok: false,
                msj: `La extension no es permitida, debe ser ${permitidas}`
            });
        }

        const nombreTmp = uuidv4();

        uploadPath = path.join(__dirname + `../../uploads/${carpeta}/` + nombreTmp + `.${extension}`);
        const nombre = nombreTmp + extension;

        archivo.mv(uploadPath, function (err) {
            if (err) {
                reject(err);
            }

            resolve(nombre);
        });
    })


}

export { subirArchivo }