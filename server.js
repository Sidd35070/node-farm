const http = require('http');
const fs = require('fs');
const url = require('url');

const card = fs.readFileSync('./templates/card.html','utf-8');
const overview = fs.readFileSync('./templates/overview.html','utf-8');
const product = fs.readFileSync('./templates/product.html','utf-8');
const data = fs.readFileSync('./dev-data/data.json','utf-8');
const dataObj = JSON.parse(data);



const replaceTemp = (temp, el) =>{
    let output = temp.replace(/{%IMAGE%}/g, el.image);
    output = output.replace(/{%NAME%}/g, el.productName);
    output = output.replace(/{%PRICE%}/g, el.price);
    output = output.replace(/{%QUANTITY%}/g, el.quantity);
    output = output.replace(/{%ID%}/g, el.id);
    output = output.replace(/{%FROM%}/g, el.from);
    output = output.replace(/{%NUTRIENTS%}/g, el.nutrients);
    output = output.replace(/{%DESC%}/g, el.description);
    if(!el.organic) output = output.replace(/{%NOT-ORGANIC%}/g, 'not-organic');
    return output;
}

const server = http.createServer((req, res) => {
    // const pathname = req.url;
    
    const {query, pathname} = url.parse(req.url, true);

    if (pathname === '/'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        const cards = dataObj.map(el => replaceTemp(card, el));
        const result = overview.replace('{%CARDS%}', cards);
        res.end(result);
        // res.end("This is your server Siddharth");
    }
    else if( pathname === '/product'){
        res.writeHead(200, {'Content-type':'text/html'});
        let result = replaceTemp(product, dataObj[query.id]);
        res.end(result);

    }
});

server.listen(8000, () =>{
    console.log("listening on port 8000...");
});
