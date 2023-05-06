const gulp = require('gulp');
const through = require('through2');
const path = require('path');
const fs = require("fs");
const VERSION = require("./build/version");
const userscript = require("gulp-userscript");
const tampermonkeyHeader = require("./build/tampermonkey-header");
const { series } = require('gulp');
const BASE_OUT_DIR = '../../../eallegretta.github.io/fifa';

const tampermonkeyHederDev = JSON.parse(JSON.stringify(tampermonkeyHeader));

tampermonkeyHederDev.updateURL = "https://pale.tools/fifa/dist/latest/paletools.development.user.js";
tampermonkeyHederDev.downloadURL = "https://pale.tools/fifa/dist/latest/paletools.development.user.js";

function getJsCode(filePath, vinylFile) {
        return vinylFile.contents;
}

function base64Encode(getCode) {
        return through.obj(function (vinylFile, encoding, callback) {
                var transformedFile = vinylFile.clone();
                const code = encodeURIComponent(vinylFile.contents);
                const name = `paletools-${vinylFile.path.indexOf('mobile') > - 1 ? 'mobile-' : ''}${VERSION}`;
                transformedFile.contents = Buffer.from(`window.paletools = window.paletools || {};\nwindow.paletools['${name}'] = "${code}";`);
                callback(null, transformedFile);
        });
}

const deploySteps = [
        { from: ['./dist/paletools-mobile*.js'], to: `${BASE_OUT_DIR}/dist/${VERSION}/` },
        { from: ['./dist/paletools-mobile.prod.js'], transform: base64Encode(getJsCode), to: `${BASE_OUT_DIR}/dist/${VERSION}/mobile` },
        { from: ['./dist/paletools.development.user.js'], transform: userscript(tampermonkeyHederDev), to: `${BASE_OUT_DIR}/dist/latest` },
        { from: ['./dist/paletools.user.js'], transform: userscript(tampermonkeyHeader), to: `${BASE_OUT_DIR}/dist/latest` },
        { from: ['./dist/paletools.prod.js'], transform: base64Encode(getJsCode), to: `${BASE_OUT_DIR}/dist/${VERSION}/` }

]

function deploy() {
        console.log(`Deploying v${VERSION}`);

        let work;

        for (let step of deploySteps) {
                work = gulp.src(step.from);
                if (step.transform) {
                        work = work.pipe(step.transform);
                }
                work = work.pipe(gulp.dest(step.to));
        }

        

        return work;
}

function postDeploy(){
        fs.writeFileSync(`${BASE_OUT_DIR}/version.txt`, VERSION);
        fs.copyFileSync(`${BASE_OUT_DIR}/dist/latest/paletools.development.user.js`, `${BASE_OUT_DIR}/dist/${VERSION}/paletools.development.user.js`);
        fs.copyFileSync(`${BASE_OUT_DIR}/dist/latest/paletools.user.js`, `${BASE_OUT_DIR}/dist/${VERSION}/paletools.user.js`);
        return Promise.resolve("DONE");
}

exports.deploy = series(deploy, postDeploy);