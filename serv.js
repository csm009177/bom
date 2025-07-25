// index.html을 보여주는 서버
const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;
const indexPath = path.join(__dirname, 'index.html');
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile(indexPath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});