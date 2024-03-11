# Node.js

## Node.js

Node.js 는 브라우저가 아닌 서버환경에서 작동하는 자바스크립트이다

Node.js는 이벤트 기반 비동기 방식이다

스레드 기반 동기 방식 : 요청이 들어올때마다 스레드를 만들어 동시에 일을 처리

이벤트 기반 비동기 방식 : 요청들을 Event loop으로 처리하며 Event loop가 처리하는 동안 제어권을 다음요청으로 넘기면서 Event loop가 처리 완료시 Callback으로 호출하여 처리완료를 알림

Express는 프레임 워크로 Node.js의 코드를 웹 어플리케이션으로 만들기 위한 라이브러리등이 있음

---

## 환경구축

```python
brew install node
node -v
npm -v
```

```python
mkdir nodejs
cd nodejs
touch app.js

npm init
#package.json 생성
npm install --save express
#package-lock.json 생성
```

[https://looplian.tistory.com/entry/MacOs에서-nodejs-개발-환경-구축하기-with-VS-Code](https://looplian.tistory.com/entry/MacOs%EC%97%90%EC%84%9C-nodejs-%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%B6%95%ED%95%98%EA%B8%B0-with-VS-Code)

### 테스트

![스크린샷 2023-11-25 오후 4.19.34.png](img/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-11-25_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_4.19.34.png)

![스크린샷 2023-11-25 오후 4.19.53.png](img/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-11-25_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_4.19.53.png)

![스크린샷 2023-11-25 오후 4.20.39.png](img/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-11-25_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_4.20.39.png)

---

## CRUD 코드

Create, Read, Update, Delete의 약자

회원가입 C:회원 추가, R: 회원 조회, U: 회원 정보 수정, D: 회원 삭제

```jsx
const express = require('express');
const app = express();
app.use(express.json());

//회원 DB
let member = [
    { name: 'joon', age: 30, gender:"male"},
    { name: 'ho', age: 40, gender:"female" }
]

//회원 추가
app.post('/member', (req, res) => {
    const { name, age, gender } = req.body;
    const mem = {name,age,gender};
		if(!name || !age || !gender) return res.status(400).json({error: '입력하지 않은 값이 있습니다.'});
    member.push(mem);
    res.json(member);
});

//회원 조회
app.get('/member', (req,res) => {
    res.json(member);
});

//회원 정보 수정
app.put('/member/:name', (req, res) => {
    const name = req.params.name;
    const index = member.findIndex(m => m.name === name);
    member[index] = req.body;
    res.json(member);
});

//회원 삭제
app.delete('/member/:name', (req, res) => {
    const name = req.params.name;
    member = member.filter(m => m.name !== name);
    res.json(member);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});
```

실행 명령문

```jsx
//회원 추가
curl -X POST http://localhost:3000/member -H "Content-Type: application/json" -d '{"name":"yoon", "age":15, "gender":"attack helicopter"}'
//회원 조회
curl -X GET http://localhost:3000/member
//회원 정보 수정
curl -X PUT http://localhost:3000/member/joon -H "Content-Type: application/json" -d '{"name":"joon", "age":25, "gender":"male"}'
//회원 삭제
curl -X DELETE http://localhost:3000/member/joon
```

### 실행 결과

![스크린샷 2023-11-25 오후 6.05.38.png](img/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-11-25_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_6.05.38.png)

### 미들웨어, 에러 핸들링 미들웨어 추가

미들웨어를 통해 요청이 들어올 때 항상 거치는 함수를 추가할 수 있다

```jsx
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
```

[node.js와 mysql연동](https://www.notion.so/node-js-mysql-5ef55c548f8a490f9211c7e2fd079850?pvs=21)