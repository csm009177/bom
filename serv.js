// index.html을 보여주는 서버
const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;
const indexPath = path.join(__dirname, 'index.html');

const server = http.createServer((req, res) => {
    // URL에서 쿼리 스트링을 제외한 부분만 가져옵니다.
    // 예를 들어, /?initialStage=3 이면 / 만 남도록 합니다.
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;

    // 모든 경로 요청에 대해 index.html을 서빙하도록 변경
    // (루트 경로이거나 다른 하위 경로여도 index.html을 보여줌)
    if (pathname === '/' || pathname === '/index.html') { // '/index.html'도 추가하여 명시적으로 접근 가능하도록 함
        fs.readFile(indexPath, 'utf8', (err, data) => {
            if (err) {
                console.error("Error reading index.html:", err); // 에러 로그 추가
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