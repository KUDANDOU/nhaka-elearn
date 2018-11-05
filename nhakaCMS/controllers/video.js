
var fs = require('fs');

exports.preview = function(req, res, next)
{
    console.log('Get Request for particular video');
    let requestedVideo = req.params.id;
    //var path = './home/powerrangers/Videos/'+requestedVideo;
    //var path = 'C:/Users/Rutnyax/Desktop/NHAKA_VIDS/'+requestedVideo+'.mp4';
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range)
    {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize-1;

        const chunkSize = (end-start)+1;
        const file = fs.createReadStream(path, {start, end});
        const head =
            {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': 'video/mp4',
            };

        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head =
            {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }
    console.log('id =>' + req.params.id);
};

exports.lessonVideo = function(req, res, next)
{
    let requestedVideo = req.params.id;
    console.log('Get Request for particular video: '+requestedVideo);
    //var path = './home/powerrangers/Videos/'+requestedVideo;
    var path = 'C:/Users/Rutnyax/Desktop/NHAKA_VIDS/'+requestedVideo+'.mp4';
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range)
    {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize-1;

        const chunkSize = (end-start)+1;
        const file = fs.createReadStream(path, {start, end});
        const head =
            {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': 'video/mp4',
            };

        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head =
            {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }
    console.log('id =>' + req.params.id);
};
