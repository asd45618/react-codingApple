import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import { createContext, useEffect, useState } from "react";
import data from "./Data";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail";
import axios from "axios";
import Cart from "./routes/Cart";

export let Context1 = createContext();

function App() {
  let [shoes, setShoes] = useState(data);
  let [재고] = useState([10, 11, 12]);
  let navigate = useNavigate();
  let [number, setNumber] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("watched") === null) {
      localStorage.setItem("watched", JSON.stringify([]));
    }
  });

  function Home() {
    return (
      <div>
        <div className="mainBg"></div>
        <Container>
          <Row>
            {shoes.map(function (a, i) {
              return <Goods key={shoes[i].id} i={i} shoes={shoes}></Goods>;
            })}
          </Row>
        </Container>
        <button
          onClick={() => {
            setNumber(number + 1);
            {
              if (number == 0) {
                axios
                  .get("https://codingapple1.github.io/shop/data2.json")
                  .then((result) => {
                    let copy = [...shoes];
                    copy.push(...result.data);
                    setShoes(copy);
                    console.log(shoes);
                  })
                  .catch(() => {
                    console.log("실패");
                  });
              } else if (number == 1) {
                axios
                  .get("https://codingapple1.github.io/shop/data3.json")
                  .then((result) => {
                    let copy = [...shoes];
                    copy.push(...result.data);
                  })
                  .catch(() => {
                    console.log("실패");
                  });
              } else {
                alert("상품이 없습니다.");
              }
            }
          }}
        >
          더보기
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
          >
            OC
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/bottom");
              }}
            >
              하의
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              디테일
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/bottom" element={<div>하의 페이지</div>} />
        <Route
          path="/detail/:id"
          element={
            <Context1.Provider value={{ 재고, shoes }}>
              <Detail shoes={shoes} />
            </Context1.Provider>
          }
        />
        <Route path="/about" element={<About></About>}>
          <Route path="member" element={<div>멤버</div>} />
          <Route path="location" element={<div>위치</div>} />
        </Route>
        <Route path="/event" element={<Event></Event>}>
          <Route path="one" element={<p>첫 주문 시 양배추즙 서비스</p>} />
          <Route path="two" element={<p>생일기념 쿠폰 받기</p>} />
        </Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="*" element={<h4>없는 페이지입니다.</h4>} />
      </Routes>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Goods(props) {
  return (
    <Col md="4">
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
        width="80%"
      ></img>
      <h4>{props.shoes[props.i].title}</h4>
      <p>{props.shoes[props.i].content}</p>
    </Col>
  );
}
export default App;
