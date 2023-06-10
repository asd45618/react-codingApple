import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { increaseAge } from "../store/userSlice";
import { increaseCount, deleteItem } from "../store";

function Cart() {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();

  return (
    <div>
      <h6>
        {state.user.name} {state.user.age}의 장바구니
      </h6>
      <button
        onClick={() => {
          dispatch(increaseAge(100));
        }}
      >
        버튼
      </button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map((a, i) => (
            <tr key={i}>
              <td>{state.cart[i].id}</td>
              <td>{state.cart[i].name}</td>
              <td>{state.cart[i].count}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(increaseCount(state.cart[i].id));
                  }}
                >
                  +
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    dispatch(deleteItem(i));
                  }}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
