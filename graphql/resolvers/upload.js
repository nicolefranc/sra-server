const { extname } = require('path');
const { v4: uuid } = require('uuid');
const s3 = require('../../controller/s3');

module.exports = {
    Mutation: {
        singleUpload: async (_, { file }) => {
            const { filename, mimetype, encoding, createReadStream } = await file;
            

            const { Location } = await s3.upload({
                Body: createReadStream(),
                Key: `${uuid()}${extname(filename)}`,
                ContentType: mimetype
            }).promise()

            return { filename, mimetype, encoding, uri: Location }
        },
        multipleUploads: async (_, { files, id }) => {
            console.log(id)
            let res = await Promise.all(
                files.map(async (file, index) => {
                    const { filename, mimetype, encoding, createReadStream } = await file;
                    

                    const { Location } = await s3.upload({
                        Body: createReadStream(),
                        Key: `${id}-0${index}`,
                        ContentType: mimetype
                    }).promise()

                    return { filename, mimetype, encoding, uri: Location }
                })
            )

            console.log(res);
            return res;
        },
        rectificationUploads: async (_, { files, id }) => {
            console.log(id)
            let res = await Promise.all(
                files.map(async (file, index) => {
                    const { filename, mimetype, encoding, createReadStream } = await file;
                    

                    const { Location } = await s3.upload({
                        Body: createReadStream(),
                        Key: `r-${id}-0${index}`,
                        ContentType: mimetype
                    }).promise()

                    return { filename, mimetype, encoding, uri: Location }
                })
            )

            console.log(res);
            return res;
        },
        deleteUpload: async(_, { filename }) => {
            console.log(`[SERVER] Deleting ${filename}`);
            let res = await s3.deleteObject({
                Key: filename
            }).promise();

            console.log(res);
            return true;
        }
    }
}