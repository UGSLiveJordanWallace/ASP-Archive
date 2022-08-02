const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
const { drive } = require("googleapis/build/src/apis/drive");

const CLIENT_ID = '1032244156692-it4qjiotbefm6lrlmvlrk2ee7ppdp8gt.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04r0WHPb5eLgECgYIARAAGAQSNwF-L9IrY_wHtYpx59KgwLZS8xxd8hbvCkhdCnR3_hLbmlniFJIH0aO2z77gOq50vBX_6XjXh9g';

class SaveAsGoogleDrive {
    constructor(path, file) {
        this.file = file;
        this.path = path;
    }

    async saveAs() {
        const { oAuth2Client, googleDrive } = this.initializeDrive();
        const filePath = path.join(this.path, `${this.file}`);
        // const { id } = await this.uploadFile(filePath, googleDrive);
        // this.deleteFile(googleDrive);

        this.publicUrlCreate(googleDrive);
        return id;
    }

    initializeDrive() {
        const oAuth2Client = new google.auth.OAuth2(
            CLIENT_ID,
            CLIENT_SECRET,
            REDIRECT_URI
        );
        oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

        const googleDrive = google.drive({
            version: 'v3',
            auth: oAuth2Client
        })

        return {oAuth2Client: oAuth2Client, googleDrive: googleDrive};
    }

    async uploadFile(filePath, drive) {
        try {
            const response = await drive.files.create({
                requestBody: {
                    name: 'asp-test-files.txt',
                    mimeType: 'text/plain'
                },
                media: {
                    mimeType: 'text/plain',
                    body: fs.createReadStream(filePath)
                }
            })

            return {id: response.data.id};
        } catch(e) {
            console.log(e)
        }
    }
    async deleteFile(drive) {
        try {
            const response = await drive.files.delete({
                fileId: "",
            })
        } catch (e) {
            console.log(e);
        }
    }
    async publicUrlCreate(drive) {
        try {
            const fileId = '1eQeilvfEynpmploQDGOAdfhB9Y6y0twj';
            await drive.permissions.create({
                fileId: fileId,
                requestBody: {
                    role: 'reader',
                    type: 'anyone'
                }
            })
            const result = await drive.files.get({
                fileId: fileId,
                fields: 'webViewLink, webContentLink'
            })

            console.log(result.data);
        } catch (e) {
            console.log(e);
        }
    }
}
module.exports.SaveAsGoogleDrive = (dirname, data) => {
    return new SaveAsGoogleDrive(dirname, data).saveAs();
};