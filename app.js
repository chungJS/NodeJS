const express = require('express');
const app = express();
app.use(express.json());

//미들웨어
app.use((req, res, next) => {
    console.log('실행 중 입니다');
    next();
});

//에러 핸들링 미들웨어
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: '서버 에러 발생' });
  });

let member = [
    { name: 'joon', age: 30, gender:"male"},
    { name: 'ho', age: 40, gender:"female" }
]

app.post('/member', (req, res) => {
    const { name, age, gender } = req.body;
    if(!name || !age || !gender) return res.status(400).json({error: '입력하지 않은 값이 있습니다.'});
    const mem = {name,age,gender};
    member.push(mem);
    res.json(member);
});

app.get('/member', (req,res) => {
    res.json(member);
});

app.put('/member/:name', (req, res) => {
    const name = req.params.name;
    const index = member.findIndex(m => m.name === name);
    member[index] = req.body;
    res.json(member);
});

app.delete('/member/:name', (req, res) => {
    const name = req.params.name;
    member = member.filter(m => m.name !== name);
    res.json(member);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});