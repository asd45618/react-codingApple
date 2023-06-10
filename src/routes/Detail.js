import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { Context1 } from "./../App";
import { addItem } from "./../store";
import { useDispatch } from "react-redux";

function Detail({ shoes }) {
  let { 재고 } = useContext(Context1);
  let { id } = useParams();
  let [count, setCount] = useState(0);
  let [warning, setWarning] = useState(true);
  let [text, setText] = useState("");
  let [tab, setTab] = useState(0);
  let [fade, setFade] = useState("");
  let dispatch = useDispatch();

  useEffect(() => {
    let recent = localStorage.getItem("watched");
    recent = JSON.parse(recent);
    recent.push(id);
    recent = new Set(recent);
    recent = Array.from(recent);

    localStorage.setItem("watched", JSON.stringify(recent));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 10);

    return () => {
      setFade("");
    };
  }, []);

  useEffect(() => {
    if (isNaN(text) == true) {
      alert("그러지 마세요.");
    }
  }, [text]);

  useEffect(() => {
    let a = setTimeout(() => {
      setWarning(false);
    }, 2000);
    return () => {
      clearTimeout(a);
    };
  }, []);

  return (
    <div className={`container start ${fade}`}>
      {warning === true ? (
        <div className="alert alert-warning">2초 이내 구매 시 할인</div>
      ) : null}
      {count}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        버튼
      </button>
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            marginLeft: "180px",
          }}
        >
          <input
            style={{ width: "80px" }}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{shoes[id].title}</h4>
          <p>{shoes[id].content}</p>
          <p>{shoes[id].price}</p>
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch(
                addItem({ id: shoes[id].id, name: shoes[id].title, count: 1 })
              );
            }}
          >
            주문하기
          </button>
        </div>
      </div>

      <Nav fill variant="tabs" defaultActiveKey="link-1">
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              setTab(0);
            }}
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-2"
            onClick={() => {
              setTab(1);
            }}
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-3"
            onClick={() => {
              setTab(2);
            }}
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab}></TabContent>
    </div>
  );
}

function TabContent({ tab }) {
  let [fade, setFade] = useState("");
  let { 재고 } = useContext(Context1);

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100);

    return () => {
      setFade("");
    };
  }, [tab]);

  return (
    <div className={`start ${fade}`}>
      {[<div>{재고}</div>, <div>내용1</div>, <div>내용2</div>][tab]}
    </div>
  );
}

export default Detail;
